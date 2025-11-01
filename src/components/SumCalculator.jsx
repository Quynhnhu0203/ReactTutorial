import { useState } from "react";
import "./SumCalculator.css";


// component chính
function SumCalculator() {
    // state
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
 
  // hàm xử lý tính toán khi bấm nút
  const handleCalculate = () => {
    // nếu 1 trong 2 ô enter number bị trống
    if (num1.trim() === "" || num2.trim() === "") {
      setError("Need 2 numbers!");
      setResult(null);
      return;
    }

    const a = Number(num1);
    const b = Number(num2);

    // xử lí case input không hợp lệ
    if (Number.isNaN(a) || Number.isNaN(b)) {
      setError("Invalid input value!");
      setResult(null);
      return;
    }

    setError("");
    setResult(a + b);
  };
  // xử lí enter
  const handleSubmit = (e) => {
    e.preventDefault(); 
    handleCalculate();
  };

  // giao diện hiển thị
  return (
    <form className="calc-card" onSubmit={handleSubmit}>
      <h1 className="title">💗 Sum Calculator 💗</h1>

      <div className="input-group">
        <label>Number 1</label>
        <input
          type="text"
          value={num1}
          onChange={(e) => setNum1(e.target.value)}
          placeholder="Enter the first number..."
        />
      </div>

      <div className="input-group">
        <label>Number 2</label>
        <input
          type="text"
          value={num2}
          onChange={(e) => setNum2(e.target.value)}
          placeholder="Enter the second number..."
        />
      </div>

      <button type="submit" className="btn">
        Calculate Sum
      </button>

      {error && <p className="error">{error}</p>}

      {result !== null && (
        <p className="result">
          🌷 Result: <strong>{result}</strong>
        </p>
      )}
    </form>
  );
}
// xuất component để sử dụng
export default SumCalculator;
