import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./Tab1.css";

import "../dbr"; // import side effects. The license, engineResourcePath, so on.
import VideoDecode from "../components/VideoDecode/VideoDecode";

let products: any = {
  "1ec74e6f-7b86-4b85-9ebe-18a3a7d0a17b": "Apples",
  "6ca34ed6-2d60-4326-bdf3-c3a22d7c3b15": "Bananas",
  "03de298c-e4d5-4b39-847b-b317337055ef": "Carrots",
  "90f7de86-7468-4f28-aef4-902726b33c35": "Broccoli",
  "a46e9a48-2001-4d70-b55e-d1a5735c5d5d": "Chicken",
  "3c3b1b43-8d99-4883-ae20-b51af8e8b0c1": "Beef",
  "fced11a8-a9b6-4fd4-8db6-8815ee0a279b": "Milk",
  "8e35f7c9-38f4-4af1-bfc5-ee7d25df46e2": "Eggs",
  "c7d2f212-21f4-4e88-96d6-8eddf213ed10": "Bread",
  "e1a0a5c5-5d5f-4f62-9df3-f4c9ac73f4d7": "Cheese",
};

const Tab1: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>QR Scanner</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 1</IonTitle>
          </IonToolbar>
        </IonHeader>
        <VideoDecode></VideoDecode>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
