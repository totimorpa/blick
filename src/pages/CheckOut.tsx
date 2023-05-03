import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonImg,
  IonGrid,
  IonCol,
  IonRow,
} from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";
import "./CheckOut.css";

const CheckOut: React.FC = () => {
  return (
    <IonPage className="page">
      <IonHeader>
        <IonToolbar>
          <IonTitle>CheckOut</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">CheckOut</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div className="center">
          <IonImg
            src="../../resources/Qr_CheckOut_Test.png"
            className="img"
          ></IonImg>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default CheckOut;
