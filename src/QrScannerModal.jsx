import React, { useEffect, useRef, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { Camera, X, AlertTriangle, CheckCircle, QrCode, RefreshCw, Upload, Info } from 'lucide-react';
import { checkpointRegistry, validateCheckpointQr } from './checkpoints';

export default function QrScannerModal({ isOpen, onClose, onScanSuccess, lang = 'en' }) {
  const [cameraState, setCameraState] = useState('initializing'); // initializing, active, denied, error
  const [errorMessage, setErrorMessage] = useState('');
  const [validationError, setValidationError] = useState('');
  const [scannedFeedback, setScannedFeedback] = useState(null);
  const scannerRef = useRef(null);
  const isStoppingRef = useRef(false);

  useEffect(() => {
    if (!isOpen) return;

    setCameraState('initializing');
    setErrorMessage('');
    setValidationError('');
    setScannedFeedback(null);
    isStoppingRef.current = false;

    const html5QrCode = new Html5Qrcode('qr-reader-target');
    scannerRef.current = html5QrCode;

    // Start scanning with environment/back camera if available
    html5QrCode
      .start(
        { facingMode: 'environment' },
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
          aspectRatio: 1.0
        },
        (decodedText) => {
          handleDetectedCode(decodedText);
        },
        () => {
          // Frame parsed without QR; ignore continuous frame errors
        }
      )
      .then(() => {
        setCameraState('active');
      })
      .catch((err) => {
        console.warn('Camera initialization error:', err);
        const errStr = String(err);
        if (errStr.includes('NotAllowedError') || errStr.includes('Permission denied')) {
          setCameraState('denied');
          setErrorMessage(
            'Camera permission was denied. Please allow camera access in your browser to scan physical checkpoint plaques, or use the verified checkpoint selector below.'
          );
        } else if (errStr.includes('NotFoundError') || errStr.includes('DevicesNotFoundError')) {
          setCameraState('error');
          setErrorMessage('No camera was detected on this device. You can test checkpoints using the registry selector below.');
        } else {
          setCameraState('error');
          setErrorMessage('Could not open camera stream. Please ensure no other application is using the camera, or test using the registry below.');
        }
      });

    return () => {
      // Clean up camera stream when modal unmounts or closes
      if (scannerRef.current && !isStoppingRef.current) {
        isStoppingRef.current = true;
        scannerRef.current
          .stop()
          .then(() => {
            scannerRef.current?.clear();
          })
          .catch(() => {
            scannerRef.current?.clear();
          });
      }
    };
  }, [isOpen]);

  const handleDetectedCode = (codeText) => {
    const result = validateCheckpointQr(codeText);

    if (!result.valid) {
      setValidationError(result.error);
      return;
    }

    setValidationError('');
    setScannedFeedback(result.checkpoint);

    // Stop camera and notify parent after a brief confirmation animation
    if (scannerRef.current && !isStoppingRef.current) {
      isStoppingRef.current = true;
      scannerRef.current
        .stop()
        .then(() => {
          scannerRef.current?.clear();
          setTimeout(() => {
            onScanSuccess(result.checkpoint);
            onClose();
          }, 600);
        })
        .catch(() => {
          onScanSuccess(result.checkpoint);
          onClose();
        });
    } else {
      setTimeout(() => {
        onScanSuccess(result.checkpoint);
        onClose();
      }, 600);
    }
  };

  const handleManualTestSelect = (cpId) => {
    handleDetectedCode(cpId);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file || !scannerRef.current) return;
    scannerRef.current
      .scanFile(file, true)
      .then((decodedText) => {
        handleDetectedCode(decodedText);
      })
      .catch((err) => {
        setValidationError('Could not detect a valid QR code in the uploaded image.');
      });
  };

  if (!isOpen) return null;

  return (
    <div className="qr-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="qr-modal-sheet" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="qr-modal-header">
          <div className="qr-modal-title-row">
            <span className="qr-title-icon">
              <QrCode size={20} />
            </span>
            <div>
              <h3>Scan Indoor Checkpoint</h3>
              <small>B. Y. L. Nair Hospital · QR Positioning</small>
            </div>
          </div>
          <button type="button" className="qr-close-btn" onClick={onClose} aria-label="Close scanner">
            <X size={18} />
          </button>
        </div>

        {/* Validation Error Banner */}
        {validationError && (
          <div className="qr-error-banner" role="alert">
            <AlertTriangle size={18} />
            <div>
              <strong>Unregistered Checkpoint</strong>
              <p>{validationError}</p>
            </div>
          </div>
        )}

        {/* Successful Confirmation Overlay */}
        {scannedFeedback && (
          <div className="qr-success-banner" role="status">
            <CheckCircle size={22} />
            <div>
              <strong>Checkpoint Verified!</strong>
              <p>
                {scannedFeedback.name[lang] || scannedFeedback.name.en} · Floor {scannedFeedback.floor === 0 ? 'Ground' : '1'}
              </p>
            </div>
          </div>
        )}

        {/* Camera Viewport Area */}
        <div className="qr-camera-viewport">
          <div id="qr-reader-target" className="qr-reader-box" />

          {cameraState === 'initializing' && (
            <div className="qr-camera-placeholder">
              <RefreshCw size={28} className="qr-spin" />
              <span>Starting camera stream...</span>
            </div>
          )}

          {(cameraState === 'denied' || cameraState === 'error') && (
            <div className="qr-camera-denied">
              <Camera size={34} />
              <strong>Camera Unavailable</strong>
              <p>{errorMessage}</p>
            </div>
          )}
        </div>

        {/* Scanner Guidance Note */}
        <div className="qr-guidance-note">
          <Info size={15} />
          <span>Point camera at any checkpoint plaque mounted on hospital walls, pillars, or doorway signs.</span>
        </div>

        {/* Desktop / Test Fixtures Section */}
        <div className="qr-test-fixtures">
          <div className="test-fixtures-title">
            <span>Verified Checkpoint Registry (Test / Dev Fixtures)</span>
          </div>
          <div className="test-checkpoint-grid">
            {Object.values(checkpointRegistry).slice(0, 6).map((cp) => (
              <button
                key={cp.id}
                type="button"
                className="test-cp-btn"
                onClick={() => handleManualTestSelect(cp.id)}
              >
                <strong>{cp.id}</strong>
                <small>{cp.name.en.split(' ')[0]} · Fl {cp.floor}</small>
              </button>
            ))}
            <button
              type="button"
              className="test-cp-btn test-cp-invalid"
              onClick={() => handleManualTestSelect('INVALID-SAMPLE-999')}
            >
              <strong>INVALID-999</strong>
              <small>Test rejection</small>
            </button>
          </div>

          <label className="qr-upload-label">
            <Upload size={14} />
            <span>Upload QR image file</span>
            <input type="file" accept="image/*" onChange={handleFileUpload} style={{ display: 'none' }} />
          </label>
        </div>
      </div>
    </div>
  );
}
