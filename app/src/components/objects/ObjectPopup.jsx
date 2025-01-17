import { useDispatch, useSelector } from "react-redux";
import Modal from "react-modal";
import { setInfoObject } from "../../features/demande/demandeSlice";
import {
  selectObjInfos,
  selectUSerInfos,
} from "../../features/demande/demandeSelector";
import "../../assets/styles/popup.scss";
import { useState } from "react";
import { updateObject } from "../../features/demande/reservationsAsyncAction";

const ObjectPopup = () => {
  const dispatch = useDispatch();
  const infoObject = useSelector(selectObjInfos);
  console.log(infoObject);
  const userInfos = useSelector(selectUSerInfos);
  const [infos, setInfos] = useState(infoObject);

  console.log(infoObject);
  const closePopup = () => {
    dispatch(setInfoObject({}));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(infos);
    dispatch(updateObject(infos));
  };
  return (
    <Modal
      className="object-popup"
      onRequestClose={closePopup}
      isOpen={infos && Object.keys(infos).length > 0}
    >
      <div className="object-popup-content">
        <button onClick={closePopup}>X</button>
        {userInfos.role === "admin" ? (
          <>
            <form onSubmit={handleSubmit} method="post">
              <div className="formPopup">
                <img
                  src={
                    infos.picture instanceof File
                      ? URL.createObjectURL(infos.picture)
                      : infos.picture
                  }
                  alt={infos.name}
                  className="imgObject"
                />
                <div className="object-infos">
                  <div className="rezav-input input-txt">
                    <label htmlFor="categorie">Categorie</label>
                    <input
                      id="categorie"
                      name="categorie"
                      value={infos.categorie}
                      onChange={(e) =>
                        setInfos({ ...infos, categorie: e.currentTarget.value })
                      }
                      className="w-100"
                    />
                  </div>

                  <div className="rezav-input input-txt">
                    <label htmlFor="name">Nom</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={infos.name}
                      onChange={(e) =>
                        setInfos({ ...infos, name: e.currentTarget.value })
                      }
                      className="w-100"
                    />
                  </div>

                  <div className="rezav-input input-txt">
                    <label htmlFor="description">Description</label>
                    <textarea
                      name="description"
                      id="description"
                      value={infos.description}
                      onChange={(e) =>
                        setInfos({
                          ...infos,
                          description: e.currentTarget.value,
                        })
                      }
                      className="w-100"
                    />
                  </div>
                  <div className="rezav-input input-file">
                    <label
                      htmlFor="picture"
                      className="material-symbols-rounded"
                    >
                      upload_file
                    </label>
                    <p className="label">
  {infos.picture instanceof File ? infos.picture.name : infos.picture}
</p>                    <p className="restrictions">ficher webp uniquement</p>
                    <input
                      id="picture"
                      type="file"
                      name="picture"
                      accept="image/webp"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        console.log(file);
                        setInfos({
                          ...infos,
                          picture: file, // Stocke directement le fichier brut
                        });
                        console.log("test");
                      }}
                      className="fileBtn"
                    />
                  </div>
                </div>
              </div>

              <button
                name="btnFormObject"
                type="submit"
                className="rezav-button-1 btnFormObject"
              >
                Modifier
              </button>
            </form>
          </>
        ) : (
          <>
            <img src={infoObject.picture} alt={infoObject.name} />
            <div>
              {" "}
              <h1>{infoObject.categorie}</h1>
              <h2>{infoObject.name}</h2>
              <p>{infoObject.description}</p>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
};

export default ObjectPopup;
