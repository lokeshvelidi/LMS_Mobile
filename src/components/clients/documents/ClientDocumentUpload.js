import React, { useState } from "react";
import * as Native from "../ClientNativeElements";

const ClientDocumentUpload = ({
  onUpload,
  onCancel,
}) => {
  const [caseNo, setCaseNo] = useState("CIV-2026-003");
  const [documentType, setDocumentType] = useState("Supporting");
  const [fileName, setFileName] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    onUpload({
      caseNo,
      documentType,
      fileName: fileName || "Selected document",
    });
  };

  return (
    <Native.Form onSubmit={handleSubmit}>
      <Native.Div style={{ marginBottom: "15px" }}>
        <Native.Label
          style={{
            display: "block",
            marginBottom: "7px",
            color: "#60758e",
            fontSize: "12px",
            fontWeight: "600",
          }}
        >
          Case
        </Native.Label>

        <Native.Select
          value={caseNo}
          onChange={(event) => setCaseNo(event.target.value)}
          style={{
            width: "100%",
            height: "44px",
            padding: "0 12px",
            border: "1px solid #dce2e8",
            borderRadius: "11px",
            background: "#ffffff",
            color: "#263b52",
          }}
        >
          <Native.Option value="CIV-2026-003">
            CIV-2026-003 — Kiran Babu vs. ABC Developers
          </Native.Option>
        </Native.Select>
      </Native.Div>

      <Native.Div style={{ marginBottom: "15px" }}>
        <Native.Label
          style={{
            display: "block",
            marginBottom: "7px",
            color: "#60758e",
            fontSize: "12px",
            fontWeight: "600",
          }}
        >
          Document Type
        </Native.Label>

        <Native.Select
          value={documentType}
          onChange={(event) =>
            setDocumentType(event.target.value)
          }
          style={{
            width: "100%",
            height: "44px",
            padding: "0 12px",
            border: "1px solid #dce2e8",
            borderRadius: "11px",
            background: "#ffffff",
            color: "#263b52",
          }}
        >
          <Native.Option value="Supporting">Supporting</Native.Option>
          <Native.Option value="Evidence">Evidence</Native.Option>
          <Native.Option value="Identity">Identity</Native.Option>
          <Native.Option value="Petition">Petition</Native.Option>
        </Native.Select>
      </Native.Div>

      <Native.Div style={{ marginBottom: "20px" }}>
        <Native.Label
          style={{
            display: "block",
            marginBottom: "7px",
            color: "#60758e",
            fontSize: "12px",
            fontWeight: "600",
          }}
        >
          File
        </Native.Label>

        <Native.Input
          type="file"
          onChange={(event) =>
            setFileName(
              event.target.files?.[0]?.name || ""
            )
          }
          style={{
            width: "100%",
            boxSizing: "border-box",
            padding: "10px",
            border: "1px dashed #b9c5d1",
            borderRadius: "11px",
            background: "#fafafa",
          }}
        />

        {fileName && (
          <Native.Div
            style={{
              marginTop: "7px",
              color: "#60758e",
              fontSize: "11px",
            }}
          >
            Selected: {fileName}
          </Native.Div>
        )}
      </Native.Div>

      <Native.Div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: "9px",
        }}
      >
        <Native.Button
          type="button"
          onPress={onCancel}
          style={{
            height: "38px",
            padding: "0 16px",
            border: "1px solid #d9e0e7",
            borderRadius: "20px",
            background: "#ffffff",
            color: "#26394f",
            fontWeight: "600",
          }}
        >
          Cancel
        </Native.Button>

        <Native.Button
          type="submit"
          style={{
            height: "38px",
            padding: "0 18px",
            border: "none",
            borderRadius: "20px",
            background: "#18324d",
            color: "#ffffff",
            fontWeight: "600",
          }}
        >
          Upload
        </Native.Button>
      </Native.Div>
    </Native.Form>
  );
};

export default ClientDocumentUpload;