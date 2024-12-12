const OpenPDFButton = ({ pdfUrl }) => {
    const openPDF = () => {
        window.open(pdfUrl, "_blank"); // Ouvre le PDF dans un nouvel onglet
    };

    return (
        <button onClick={openPDF} style={{ padding: "10px 20px", cursor: "pointer" }} className="material-symbols-rounded">
            visibility
        </button>
    );
};

export default OpenPDFButton;
