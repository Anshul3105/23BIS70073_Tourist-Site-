// components/Button.jsx
export default function Button({ children, className = "", ...props }) {
  return (
    <button
      {...props}
      className={`px-6 py-3 rounded-xl font-semibold transition 
        bg-cyan-500 hover:bg-cyan-600 text-white shadow-md 
        ${className}`}
    >
      {children}
    </button>
  );
}
