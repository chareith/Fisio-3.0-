import React, { useState } from "react";
import { Excalidraw, WelcomeScreen, MainMenu, Footer } from "@excalidraw/excalidraw";

const ExcalidrawComponent = () => {
  const [excalidrawAPI, setExcalidrawAPI] = useState<any>(null);

  // Function to add a background image
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
        fileId: `image-${Date.now()}`,
        locked: true, // Lock the background image immediately
      };

      excalidrawAPI.updateScene({
        elements: [...excalidrawAPI.getSceneElements(), element],
      });
    };

    image.onerror = () => {
      console.error(`Failed to load image from ${imageUrl}`);
    };
  };

  return (
    <div style={{ height: "100%", position: "relative" }}>
      <Excalidraw
        excalidrawAPI={setExcalidrawAPI} // Set API using the excalidrawAPI prop
        initialData={{
          appState: { theme: "light" },
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

        <Footer>
          <button
            onClick={() => addBackgroundImage("/templates/field.jpeg")}
            style={{ margin: "0 5px", padding: "5px 10px", cursor: "pointer" }}
          >
            Load Background 1
          </button>
          <button
            onClick={() => addBackgroundImage("/images/FisioLogo.png")}
            style={{ margin: "0 5px", padding: "5px 10px", cursor: "pointer" }}
          >
            Load Background 2
          </button>
        </Footer>
      </Excalidraw>
    </div>
  );
};

export default ExcalidrawComponent;
