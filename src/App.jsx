import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState(null);
  const [bmistatus, setStatus] = useState("");
  const [errmsg, setErrmsg] = useState("");

  const calculatebmi = () => {
    if (!height || !weight) {
      setErrmsg("Height and weight cannot be empty.");
      return;
    }

    const isvalidheight = /^\d+(\.\d+)?$/.test(height);
    const isvalidweight = /^\d+(\.\d+)?$/.test(weight);

    if (isvalidheight && isvalidweight) {
      const heightmeter = height / 100;
      const bmivalue = weight / (heightmeter * heightmeter);
      setBmi(bmivalue.toFixed(2));

      if (bmivalue < 18.5) {
        setStatus("Underweight");
      } else if (bmivalue >= 18.5 && bmivalue <= 24.9) {
        setStatus("Normal Weight");
      } else if (bmivalue >= 25 && bmivalue <= 29.9) {
        setStatus("Overweight");
      } else {
        setStatus("Obese");
      }
      setErrmsg("");
    } else {
      setBmi(null);
      setStatus("");
      setErrmsg("Please enter valid numeric values (numbers or decimals).");
    }
  };

  const clearall = () => {
    setHeight("");
    setWeight("");
    setBmi(null);
    setStatus("");
    setErrmsg("");
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="row shadow-lg rounded bg-white overflow-hidden" style={{ maxWidth: "900px" }}>
        {/* Left Side Image */}
        <div className="col-md-5 d-none d-md-block p-0">
          <img
            src="src\assets\BMI1.jpeg"
            alt="src\assets\BMI1.jpeg"
            className="img-fluid h-100"
            style={{ objectFit: "cover" }}
          />
        </div>

        {/* Right Side Form */}
        <div className="col-md-7 p-4">
          <h1 className="text-center text-primary mb-4">BMI Calculator</h1>
          {errmsg && <div className="alert alert-danger">{errmsg}</div>}

          <div className="mb-3">
            <label htmlFor="height" className="form-label fw-bold text-secondary">
              Height (cm):
            </label>
            <input
              type="text"
              id="height"
              className="form-control"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="Enter your height"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="weight" className="form-label fw-bold text-secondary">
              Weight (kg):
            </label>
            <input
              type="text"
              id="weight"
              className="form-control"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="Enter your weight"
            />
          </div>

          <div className="d-flex gap-2">
            <button className="btn btn-primary w-50" onClick={calculatebmi}>
              Calculate BMI
            </button>
            <button className="btn btn-danger w-50" onClick={clearall}>
              Clear
            </button>
          </div>

          {bmi !== null && (
            <div className="alert alert-info mt-4">
              <p className="mb-1 fw-bold">Your BMI: {bmi}</p>
              <p className="mb-0">Status: {bmistatus}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
