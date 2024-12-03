import React, { useEffect, useState, useRef } from "react";
import { Excalidraw, WelcomeScreen, MainMenu } from "@excalidraw/excalidraw";

const ExcalidrawComponent = () => {
  const [isClient, setIsClient] = useState(false);
  const [excalidrawAPI, setExcalidrawAPI] = useState<ReturnType<typeof Excalidraw> | null>(null);
  const excalidrawRef = useRef<ReturnType<typeof Excalidraw> | null>(null);

  const addBackgroundImage = async (imageUrl: string) => {
    if (!excalidrawAPI) {
      console.error("Excalidraw API is not initialized yet");
      return;
    }

    const image = new Image();
    image.src = imageUrl;

    image.onload = () => {
      console.log("Image loaded successfully");
      const element = {
        id: `background-${Date.now()}`,
        type: "image",
        x: 0,
        y: 0,
        width: image.width,
        height: image.height,
        scale: 1,
        fileId: imageUrl,
        status: "idle",
        isBackground: true,
      };

      excalidrawAPI.addElements([element]);

      excalidrawAPI.updateScene({
        elements: excalidrawAPI
          .getSceneElements()
          .map((el: { id: string }) => (el.id === element.id ? { ...el, locked: true } : el)),
      });
    };

    image.onerror = () => {
      console.error(`Failed to load image from ${imageUrl}`);
    };
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    console.log("Excalidraw API initialized:", excalidrawAPI);
  }, [excalidrawAPI]);

  if (!isClient) {
    return null;
  }

  return (
    <div style={{ height: "100%", position: "relative" }}>
      <div style={{ position: "absolute", top: "10px", left: "10px", zIndex: 100 }}>
        <button onClick={() => addBackgroundImage("/templates/field.jpeg")} disabled={!excalidrawAPI}>
          Load Background 1
        </button>
        <button onClick={() => addBackgroundImage("/images/FisioLogo.png")} disabled={!excalidrawAPI}>
          Load Background 2
        </button>
      </div>
      <Excalidraw
        ref={(api) => {
          excalidrawRef.current = api;
          setExcalidrawAPI(api);
        }}
        initialData={{
          appState: { showStats: false, theme: "light" },
        }}
        UIOptions={{
          canvasActions: { clearCanvas: true, loadScene: true, saveScene: true },
        }}
      >
        <WelcomeScreen>
          <WelcomeScreen.Center>
            <WelcomeScreen.Center.Logo>
              <img src="/images/FisioLogo.png" style={{ height: "50%" }} alt="Logo" />
            </WelcomeScreen.Center.Logo>
            <WelcomeScreen.Center.Heading>Welcome To Fisio!</WelcomeScreen.Center.Heading>
            <WelcomeScreen.Center.Menu>
              <WelcomeScreen.Center.MenuItemLoadScene />
            </WelcomeScreen.Center.Menu>
          </WelcomeScreen.Center>
        </WelcomeScreen>

        <MainMenu>
          <MainMenu.DefaultItems.ToggleTheme />
        </MainMenu>
      </Excalidraw>
    </div>
  );
};

export default ExcalidrawComponent;
