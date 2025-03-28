// useCanvas.js
import { CanvasScreen, Sprite } from "@jaymar921/2dgraphic-utils";
import { useEffect, useState } from "react";

/**
 *
 * @param {string} canvasId
 * @param {Number} width
 * @param {Number} height
 * @param {string} background
 */
export function useCanvas(
  canvasId = "my-canvas",
  width,
  height,
  background = "black"
) {
  const [canvas, setCanvas] = useState();

  useEffect(() => {
    const canvas = new CanvasScreen(canvasId, width, height, background);
    setCanvas(canvas);
  }, [canvasId, background]);

  /**
   * Returns the camera offset relative of the canvas screen.
   *
   * Does not get affected on zoom effect
   * @returns {{x: Number, y: Number}}
   */
  function getFixedCameraOffset() {
    return CanvasScreen.fixedCameraOffset;
  }

  /**
   * Returns the camera offset of the canvas screen
   * @returns {{x: Number, y: Number}}
   */
  function getCameraOffset() {
    return CanvasScreen.cameraOffset;
  }

  /**
   * Set the x and y offset of the canvas screen camera
   * @param {Number} x
   * @param {Number} y
   */
  function setCameraOffset(x = 0, y = 0) {
    CanvasScreen.cameraOffset = {
      x,
      y,
    };
  }

  /**
   * Enable Camera Movement using mouse drag
   * @param {boolean} arg
   */
  function enableScreenDrag(bool) {
    if (!canvas) return;
    canvas.enableScreenDrag(bool);
  }

  /**
   * This triggers a callback function that can be used when a mouse cursor clicked on an object's hitbox inside the CanvasScreen (Basically an interaction). It will also return the position of the mouse in the CanvasScreen.
   * @param {Function} callback
   */
  function handleScreenClickedEvent(callbackFunc) {
    if (!canvas) return;
    canvas.handleScreenClickedEvent(callbackFunc);
  }

  /**
   *
   * @param {Sprite} obj A sprite object to render on screen
   */
  function registerObject(sprite) {
    if (!canvas) return;
    canvas.registerObject(sprite);
  }

  /**
   *
   * @param {string} objectId Remove a sprite object that is rendered on screen
   */
  function unregisterObject(objectId) {
    if (!canvas) return;
    canvas.unregisterObject(objectId);
  }

  /**
   *
   * @param {string} objectId Get a sprite object that is rendered on screen
   * @returns {Sprite | null}
   */
  function getRegisteredObject(objectId) {
    if (!canvas) return;
    canvas.getRegisteredObject(objectId);
  }

  /**
   * Returns a list of registered sprite objects that was rendered on screen
   * @returns {Array<Sprite>}
   */
  function getAllRegisteredObjects() {
    if (!canvas) return;
    canvas.getAllRegisteredObjects();
  }

  /**
   * Scale up images rendered inside the canvas [1.1.6]
   * @param {Number} value
   */
  function setGlobalScale(value) {
    if (!canvas) return;
    canvas.setGlobalScale(value);
  }

  function getGlobalScale() {
    if (!canvas) return 1;
    return canvas.globalScale;
  }

  /**
   * Enable canvas zoom
   * @param {boolean} bool
   */
  function enableScreenZoom(bool) {
    if (!canvas) return;
    canvas.enableScreenZoom(bool);
  }

  /**
   * Triggers a callback function that can be used when a screen zoom is triggered [1.1.6]
   * @param {Function} callback
   */
  function handleScreenZoomEvent(callback) {
    if (!canvas) return;
    canvas.handleScreenZoomEvent(callback);
  }

  /**
   * Set the value of zoom speed, default of 0.01 [1.1.6]
   * @param {Number} value
   */
  function setZoomSpeed(value = 0.01) {
    if (!canvas) return;
    canvas.setZoomSpeed(value);
  }

  function getScreen() {
    return canvas;
  }

  return {
    registerObject,
    unregisterObject,
    handleScreenClickedEvent,
    enableScreenDrag,
    getRegisteredObject,
    getAllRegisteredObjects,
    getCameraOffset,
    setCameraOffset,
    setGlobalScale,
    enableScreenZoom,
    handleScreenZoomEvent,
    setZoomSpeed,
    getFixedCameraOffset,
    getGlobalScale,
    getScreen,
  };
}
