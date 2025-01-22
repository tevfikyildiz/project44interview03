import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  return <GenerateList />;
}

const GenerateList = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchActivity = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
      setActivities([response.data[Math.floor(Math.random() * response.data.length)]]);  // Rastgele bir görev seç
    } catch (error) {
      setError(true);
      setErrorMessage("Aktivite alınırken hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivity();
  }, []);

  return (
    <div className="p-6 font-sans">
      <h1 className="text-2xl font-bold mb-4">Rastgele Aktivite Üretici</h1>
      <button
        onClick={fetchActivity}
        disabled={loading}
        className={`px-4 py-2 text-white rounded ${
          loading
            ? "bg-gray-500 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading ? "Yükleniyor..." : "Yeni Aktivite Üret"}
      </button>
      {error && (
        <p className="mt-4 text-red-500">{errorMessage}</p>
      )}
      <div className="mt-6 space-y-4">
        {activities.map((activity) => (
          <ExpandableListItem key={activity.id} item={activity} />
        ))}
      </div>
    </div>
  );
};

const ExpandableListItem = ({ item }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border border-gray-300 rounded p-4 shadow-md">
      <div className="flex justify-between items-center">
        <p className="text-lg font-semibold">{item.title}</p>
        <button
          onClick={() => setExpanded((prev) => !prev)}
          className="text-sm text-blue-500 hover:text-blue-700"
        >
          {expanded ? "Daralt" : "Detayları Gör"}
        </button>
      </div>
      {expanded && (
        <div className="mt-4 text-sm text-gray-700">
          <p>
            <strong>Durum:</strong> {item.completed ? "Tamamlandı" : "Tamamlanmadı"}
          </p>
          <p><strong>ID:</strong> {item.id}</p>
        </div>
      )}
    </div>
  );
};




export default App;
