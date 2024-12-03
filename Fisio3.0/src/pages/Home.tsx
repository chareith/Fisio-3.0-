import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import {Excalidraw} from "@excalidraw/excalidraw";
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
import ExcalidrawComponent from "../components/ExcalidrawComponent";

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>FISIO</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">FISIO</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExcalidrawComponent/>
    

      </IonContent>
    </IonPage>
  );
};

export default Home;
