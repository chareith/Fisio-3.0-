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
  
        // Register the image file using excalidrawAPI.addFiles
        excalidrawAPI.addFiles([
          {
            id: fileId,
            dataURL,
            mimeType: blob.type,
            created: Date.now(),
          },
        ]);
  
        // Create the image element
        const imageElement = {
          type: "image",
          version: 1,
          versionNonce: Math.floor(Math.random() * 1000000),
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
          boundElements: [],
          updated: Date.now(),
          fileId, // Link to the registered file
          status: "pending",
          locked: true,
        };
  
        // Update the scene with the new element
        excalidrawAPI.updateScene({
          elements: [...excalidrawAPI.getSceneElements(), imageElement],
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
          </WelcomeScreen.Center>
        </WelcomeScreen>
        <MainMenu>
          <MainMenu.DefaultItems.SaveAsImage/>
          <MainMenu.DefaultItems.Export/>
          <MainMenu.DefaultItems.ClearCanvas/>
          <MainMenu.DefaultItems.LoadScene/>
          <MainMenu.DefaultItems.ToggleTheme/>
          <MainMenu.DefaultItems.ChangeCanvasBackground />

        </MainMenu>

        <Footer>
          <button
            onClick={() => addBackgroundImage("/templates/field2.jpg")}
            style={{ margin: "0 5px", padding: "5px 10px", cursor: "pointer" }}
          >
            Load Field 1
          </button>
        </Footer>
      </Excalidraw>
    </div>
  );
};

export default ExcalidrawComponent;
