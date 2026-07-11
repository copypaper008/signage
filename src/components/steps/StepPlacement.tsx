import { useEffect, useRef, useState } from 'react'
import type Konva from 'konva'
import { Stage, Layer, Image as KonvaImage, Rect, Transformer } from 'react-konva'
import useImage from 'use-image'
import { useWizardStore } from '../../store/wizardStore'
import { LightboxDesign } from '../LightboxDesign'
import { fileToDataUrl } from '../../utils/file'

const MAX_STAGE_W = 640
const MAX_STAGE_H = 460

export function StepPlacement() {
  const {
    envPhotoDataUrl,
    setEnvPhotoDataUrl,
    resetPlacementForNewPhoto,
    placement,
    setPlacement,
    widthMm,
    heightMm,
    corner,
    frameColor,
    faceColor,
    illuminationOn,
    ledColor,
    graphicMode,
    text,
    textColor,
    fontFamily,
    logoDataUrl,
  } = useWizardStore()

  const [bgImage] = useImage(envPhotoDataUrl ?? '')
  const [selected, setSelected] = useState(false)
  const stageRef = useRef<Konva.Stage>(null)
  const shapeRef = useRef<Konva.Group>(null)
  const trRef = useRef<Konva.Transformer>(null)

  useEffect(() => {
    if (trRef.current && shapeRef.current && selected) {
      trRef.current.nodes([shapeRef.current])
      trRef.current.getLayer()?.batchDraw()
    } else if (trRef.current) {
      trRef.current.nodes([])
      trRef.current.getLayer()?.batchDraw()
    }
  }, [selected, envPhotoDataUrl])

  let stageW = MAX_STAGE_W
  let stageH = MAX_STAGE_H
  if (bgImage) {
    const ratio = bgImage.width / bgImage.height
    if (MAX_STAGE_W / ratio <= MAX_STAGE_H) {
      stageW = MAX_STAGE_W
      stageH = MAX_STAGE_W / ratio
    } else {
      stageH = MAX_STAGE_H
      stageW = MAX_STAGE_H * ratio
    }
  }

  const baseWidthPx = stageW * 0.32
  const baseHeightPx = baseWidthPx * (heightMm / widthMm)
  const layerWidth = baseWidthPx * placement.scale
  const layerHeight = baseHeightPx * placement.scale

  const handlePhotoChange = async (file: File | undefined) => {
    if (!file) return
    const dataUrl = await fileToDataUrl(file)
    setEnvPhotoDataUrl(dataUrl)
    resetPlacementForNewPhoto()
    setSelected(false)
  }

  const handleDragEnd = (e: Konva.KonvaEventObject<DragEvent>) => {
    setPlacement({ x: e.target.x() / stageW, y: e.target.y() / stageH })
  }

  const handleTransformEnd = () => {
    const node = shapeRef.current
    if (!node) return
    const newScale = Math.max(0.2, placement.scale * node.scaleX())
    const newRotation = node.rotation()
    node.scaleX(1)
    node.scaleY(1)
    setPlacement({ scale: newScale, rotation: newRotation })
  }

  const handleDownload = () => {
    const stage = stageRef.current
    if (!stage) return
    const wasSelected = selected
    setSelected(false)
    requestAnimationFrame(() => {
      const uri = stage.toDataURL({ pixelRatio: 2 })
      const link = document.createElement('a')
      link.download = 'my-lightbox-preview.png'
      link.href = uri
      link.click()
      if (wasSelected) setSelected(true)
    })
  }

  return (
    <div className="step">
      <h2>See it in your space</h2>
      <p className="step-hint">
        Upload a photo of your storefront awning, then drag, resize, and rotate your lightbox
        design to match.
      </p>

      <label className="upload-dropzone">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handlePhotoChange(e.target.files?.[0])}
        />
        {envPhotoDataUrl ? 'Change photo' : 'Upload a photo of your awning'}
      </label>

      {envPhotoDataUrl ? (
        <>
          <div className="placement-stage-wrap">
            <Stage
              ref={stageRef}
              width={stageW}
              height={stageH}
              onMouseDown={(e) => {
                const clickedBackground =
                  e.target === e.target.getStage() || e.target.getClassName() === 'Image'
                if (clickedBackground) setSelected(false)
              }}
            >
              <Layer>
                {bgImage && <KonvaImage image={bgImage} width={stageW} height={stageH} />}
                {!bgImage && <Rect width={stageW} height={stageH} fill="#eee" />}
                <LightboxDesign
                  ref={shapeRef}
                  x={placement.x * stageW}
                  y={placement.y * stageH}
                  width={layerWidth}
                  height={layerHeight}
                  rotation={placement.rotation}
                  corner={corner}
                  frameColor={frameColor}
                  faceColor={faceColor}
                  illuminationOn={illuminationOn}
                  ledColor={ledColor}
                  graphicMode={graphicMode}
                  text={text}
                  textColor={textColor}
                  fontFamily={fontFamily}
                  logoDataUrl={logoDataUrl}
                  draggable
                  onDragEnd={handleDragEnd}
                  onClick={() => setSelected(true)}
                  onTap={() => setSelected(true)}
                />
                <Transformer
                  ref={trRef}
                  rotateEnabled
                  keepRatio
                  enabledAnchors={['top-left', 'top-right', 'bottom-left', 'bottom-right']}
                  boundBoxFunc={(oldBox, newBox) =>
                    newBox.width < 20 || newBox.height < 20 ? oldBox : newBox
                  }
                  onTransformEnd={handleTransformEnd}
                />
              </Layer>
            </Stage>
          </div>
          <div className="placement-select-hint">
            <span>Click the lightbox to drag, resize, or rotate it into place.</span>
            <button type="button" className="link-button" onClick={handleDownload}>
              Download image
            </button>
          </div>
        </>
      ) : (
        <p className="placeholder-note">
          No photo yet — you can still continue, or add one now for the most realistic preview.
        </p>
      )}
    </div>
  )
}
