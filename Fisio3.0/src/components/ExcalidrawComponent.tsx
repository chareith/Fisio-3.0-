import React, { useState } from "react";
import { Excalidraw, WelcomeScreen, MainMenu, Footer } from "@excalidraw/excalidraw";

const ExcalidrawComponent = () => {
  const [excalidrawAPI, setExcalidrawAPI] = useState<any>(null);
  const addBackgroundImage = async (imageUrl: string) => {
    if (!excalidrawAPI) {
      console.error("Excalidraw API is not initialized yet");
      return;
    }
  
    try {
      // Fetch the image as a blob
      const response = await fetch(imageUrl);
      const blob = await response.blob();
  
      // Convert blob to data URL
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataURL = reader.result as string;
  
        // Create a unique fileId
        const fileId = `image-${Date.now()}`;
  
        // Register the image in the files object
        const files = {
          ...excalidrawAPI.getFiles(),
          [fileId]: {
            dataURL,
            mimeType: blob.type,
            created: Date.now(),
            lastRetrieved: Date.now(),
          },
        };
  
        // Create the image element
        const imageElement = {
          type: "image",
          version: 1,
          versionNonce: 123456,
          isDeleted: false,
          id: `background-${Date.now()}`,
          fillStyle: "hachure",
          strokeWidth: 1,
          strokeStyle: "solid",
          roughness: 1,
          opacity: 100,
          angle: 0,
          x: 0,
          y: 0,
          strokeColor: "#000000",
          backgroundColor: "transparent",
          width: 800, // Adjust as needed
          height: 600, // Adjust as needed
          seed: Math.floor(Math.random() * 100000),
          groupIds: [],
          strokeSharpness: "sharp",
          boundElements: null,
          updated: Date.now(),
          fileId, // Link to the registered file
          locked: true,
        };
  
        // Update the scene with the new element and files
        excalidrawAPI.updateScene({
          elements: [...excalidrawAPI.getSceneElements(), imageElement],
          files,
        });
  
        // Center the view on the new image
        excalidrawAPI.scrollToContent({
          elements: [imageElement],
        });
  
        console.log("Background image added to the scene.");
      };
  
      reader.readAsDataURL(blob);
    } catch (error) {
      console.error(`Failed to load image from ${imageUrl}`, error);
    }
  };
  
    return (
    <div style={{ height: "100%", position: "relative" }}>
      <Excalidraw
        excalidrawAPI={setExcalidrawAPI}
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
