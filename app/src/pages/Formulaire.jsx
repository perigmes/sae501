import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { v4 as uuid } from "uuid";
import {
  selectDataDemande,
  selectFormStep,
  selectFormValidation,
  selectObjects,
} from "../features/demande/demandeSelector";
import { useDispatch } from "react-redux";
import { formatDateToDateHourMinute } from "../utils/tools";
import { setFormValidation, updateDataDemande } from "../features/demande/demandeSlice";
import "../assets/styles/formulaire.scss";

export const Formulaire = () => {
  const objects = useSelector(selectObjects);
  const formStep = useSelector(selectFormStep);
  const dataDemande = useSelector(selectDataDemande);
  const isFormValide = useSelector(selectFormValidation);
  const dispatch = useDispatch();

  const filteredObjects = objects.filter((obj) =>
    dataDemande.objects.includes(obj._id)
  );

  const [membresG, setMembresG] = useState([
    {
      firstName: "Pierrick",
      lastName: "Breaud",
      groupeTd: "TD33",
    },
  ]);

  const TD = [
    { id: 0, grp: "-" },
    { id: 1, grp: "TD11" },
    { id: 2, grp: "TD12" },
    { id: 3, grp: "TD13" },
    { id: 4, grp: "TD21" },
    { id: 5, grp: "TD22" },
    { id: 6, grp: "TD23" },
    { id: 7, grp: "TD31" },
    { id: 8, grp: "TD32" },
    { id: 9, grp: "TD33" },
  ];

  const [fileName, setFileName] = useState("Déposez votre plan ici"); // État pour le nom du fichier
  const [checkboxResp, setCheckboxResp] = useState(false);
  const [luApprouve, setLuApprouve] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
    } else {
      setFileName("Déposez votre plan ici");
    }
  };

  useEffect(() => {
    const initialMembre = membresG[0];
    if (
      initialMembre.firstName.trim() !== "" &&
      initialMembre.lastName.trim() !== "" &&
      initialMembre.groupeTd !== "-"
    ) {
      dispatch(
        updateDataDemande({
          id: "group",
          value: [
            ...dataDemande.group,
            {
              firstName: initialMembre.firstName,
              lastName: initialMembre.lastName,
              groupeTd: initialMembre.groupeTd,
            },
          ],
        })
      );
    }
  }, []);

  const addMembre = () => {
    setMembresG((prevMembres) => [
      ...prevMembres,
      { firstName: "", lastName: "", groupeTd: "-" },
    ]);
  };

  const removeMembre = (index) => {
    const membreToRemove = membresG[index];
    setMembresG((prevMembres) =>
      prevMembres.filter((_, i) => i !== index)
    );

    const updatedGroup = dataDemande.group.filter(
      (member) =>
        member.firstName !== membreToRemove.firstName ||
        member.lastName !== membreToRemove.lastName ||
        member.groupeTd !== membreToRemove.groupeTd
    );
    dispatch(updateDataDemande({ id: "group", value: updatedGroup }));
    console.log("Membre supprimé, groupe mis à jour :", updatedGroup);
  };

  const validateAndAddToContext = (membre) => {
    if (
      membre.firstName.trim() !== "" &&
      membre.lastName.trim() !== "" &&
      membre.groupeTd !== "-"
    ) {
      const updatedGroup = [
        ...dataDemande.group,
        {
          firstName: membre.firstName,
          lastName: membre.lastName,
          groupeTd: membre.groupeTd,
        },
      ];
      dispatch(updateDataDemande({ id: "group", value: updatedGroup }));
      console.log("Groupe mis à jour :", updatedGroup);
    }
  };

  const validateForm = () => {
    // Vérification des membres
    const allMembersValid = membresG.every(
      (membre) =>
        membre.firstName.trim() !== "" &&
        membre.lastName.trim() !== "" &&
        membre.groupeTd !== "-"
    );
    console.log("Validation des membres :", allMembersValid);
  
    // Vérification de la case responsabilité
    console.log("Checkbox de responsabilité cochée :", checkboxResp);
  
    // Vérification de la signature
    const luApprouveValid = luApprouve.trim().toLowerCase() === "lu et approuvé";
    console.log("Signature 'Lu et approuvé' valide :", luApprouveValid);
  
    // Validation globale
    const isValid =
      membresG.length > 0 &&
      allMembersValid &&
      checkboxResp &&
      luApprouveValid;
  
    console.log("Validation globale du formulaire :", isValid);
  
    // Mise à jour de Redux
    dispatch(setFormValidation(isValid));
  };
  
  // Appeler validateForm à chaque modification d'un état pertinent
  useEffect(() => {
    validateForm();
  }, [membresG, checkboxResp, luApprouve]);
  

  useEffect(() => {
    validateForm();
  }, [membresG, checkboxResp, luApprouve]);

  const handleChange = (value, index, field) => {
    setMembresG((prevMembres) => {
      const updatedMembres = [...prevMembres];
      updatedMembres[index][field] = value;
      return updatedMembres;
    });

    const membre = {
      ...membresG[index],
      [field]: value,
    };
    validateAndAddToContext(membre);
  };

  const handleChangeInput = (newValue, id) => {
    dispatch(updateDataDemande({ id, value: newValue }));
  };

  return (
    <>
      <div className="res-list-obj">
        <header>
          <h3>Mes articles sélectionnés</h3>
          <span>
            Du {formatDateToDateHourMinute(dataDemande.startDT)} au{" "}
            {formatDateToDateHourMinute(dataDemande.returnDT)}
          </span>
        </header>
        <div>
          {filteredObjects.map((object) => (
            <div className="object-list-item" key={object._id}>
              <span className="title">{object.name}</span>
              <span className="status">Disponible</span>
              <span className="material-symbols-rounded icon">check</span>
              <div className="color-status"></div>
            </div>
          ))}
        </div>
      </div>

      <form className={`res-form form-step-${formStep}`}>
        <header>
          <h3>Formulaire de demande</h3>
        </header>

        <fieldset className="step-field-1">
          <h4>Votre Projet</h4>
          <div className="rezav-input input-txt">
            <label htmlFor="name">Nom du projet</label>
            <input
              type="text"
              placeholder="Écrivez ici"
              id="name"
              name="name"
              value={dataDemande.name || ""}
              onChange={(e) => handleChangeInput(e.target.value, "name")}
            />
          </div>
          <div className="rezav-input input-txt">
            <label htmlFor="desc">Description du projet</label>
            <textarea
              id="desc"
              placeholder="Écrivez ici"
              name="desc"
              value={dataDemande.desc || ""}
              onChange={(e) => handleChangeInput(e.target.value, "desc")}
            ></textarea>
          </div>
          <h4>Votre plan d'implantation</h4>
          <div className="rezav-input input-file">
            <input
              id="plan"
              accept=".pdf, image/png, image/jpeg, image/webp"
              type="file"
              name="plan"
              onChange={(e) => {
                handleFileChange(e);
                handleChangeInput(e.target.value, "plan");
              }}
            />
            <label htmlFor="plan" className="material-symbols-rounded">
              upload_file
            </label>
            <p className="label">{fileName}</p>
            <p className="restrictions">fichier pdf ou img uniquement</p>
          </div>
          <h4>Justification du matériel choisi</h4>
          <div className="rezav-input input-txt">
            <textarea
              placeholder="Écrivez ici"
              id="justif"
              name="justif"
              value={dataDemande.justif || ""}
              onChange={(e) => handleChangeInput(e.target.value, "justif")}
            ></textarea>
          </div>
        </fieldset>
        <fieldset className="step-field-2">
          <h4>Votre groupe</h4>
          <div className="groupe">
            {membresG.map((membre, index) => (
              <div className="membre" key={index}>
                <div className="rezav-input input-txt">
                  <label htmlFor={`prenom-${index}`}>Prénom</label>
                  <input
                    type="text"
                    placeholder="Écrivez ici"
                    id={`prenom-${index}`}
                    name={`prenom-${index}`}
                    value={membre.firstName}
                    onChange={(e) => handleChange(e.target.value, index, "firstName")}
                  />
                </div>
                <div className="rezav-input input-txt">
                  <label htmlFor={`nom-${index}`}>Nom</label>
                  <input
                    type="text"
                    placeholder="Écrivez ici"
                    id={`nom-${index}`}
                    name={`nom-${index}`}
                    value={membre.lastName}
                    onChange={(e) => handleChange(e.target.value, index, "lastName")}
                  />
                </div>
                <div className="rezav-input input-select">
                  <label htmlFor={`groupe-${index}`}>Groupe TD</label>
                  <select
                    id={`groupe-${index}`}
                    name={`groupe-${index}`}
                    value={membre.groupeTd}
                    onChange={(e) => handleChange(e.target.value, index, "groupeTd")}
                  >
                    {TD.map((td) => (
                      <option key={td.id} value={td.grp}>
                        {td.grp}
                      </option>
                    ))}
                  </select>
                </div>
                <span
                  className="material-symbols-rounded close"
                  onClick={() => removeMembre(index)}
                >
                  close
                </span>
              </div>
            ))}
            <button
              role="button"
              onClick={(e) => {
                e.preventDefault();
                addMembre();
              }}
            >
              Ajouter un membre{" "}
              <span className="material-symbols-rounded">add_circle</span>
            </button>
          </div>
          <div className="div-responsabilite">
            <input
              id="checkboxResp"
              className="rezav-checkbox"
              type="checkbox"
              checked={checkboxResp}
              onChange={(e) => setCheckboxResp(e.target.checked)}
            />
            <label className="rezav-checkbox-label" htmlFor="checkboxResp"></label>
            <p>
              En cochant cette case, je déclare prendre le matériel désigné en
              charge, en bon état. Je certifie également que ce matériel ne sera
              pas utilisé pour un usage commercial. Enfin je m’engage à ramener
              et ranger le matériel dans les délais fixés, et à signaler toute
              anomalie dans le fonctionnement du matériel.
            </p>
          </div>
          <div className="rezav-input input-txt">
            <label htmlFor="luApprouve">Signé "Lu et approuvé"</label>
            <input
              type="text"
              placeholder="Écrivez ici"
              id="luApprouve"
              name="luApprouve"
              value={luApprouve}
              onChange={(e) => setLuApprouve(e.target.value)}
            />
          </div>
        </fieldset>
      </form>
    </>
  );
};