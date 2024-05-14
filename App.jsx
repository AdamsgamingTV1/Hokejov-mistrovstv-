import React from 'react';
import './App.css';

function App() {
  const [matches, setMatches] = useState([]);
  const [filteredMatches, setFilteredMatches] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('/data/matches.json')
      .then(response => response.json())
      .then(data => {
        setMatches(data.matches);
        setFilteredMatches(data.matches);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleFilter = (searchTerm) => {
    setSearchTerm(searchTerm);
    if (!searchTerm) {
      setFilteredMatches(matches);
      return;
    }
    const filtered = matches.filter(match =>
      match.team1.toLowerCase().includes(searchTerm.toLowerCase()) ||
      match.team2.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredMatches(filtered);
  };

  return (
    <div className="App">
      <h1>Hokejové mistrovství světa 2024</h1>
      <div className="Filter">
        <input
          type="text"
          placeholder="Vyhledat zápas"
          value={searchTerm}
          onChange={(e) => handleFilter(e.target.value)}
        />
      </div>
      <div className="MatchList">
        <h2>Zápasy</h2>
        <ul>
          {filteredMatches.map(match => (
            <li key={match.id}>
              {match.team1} vs. {match.team2}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <h1>Hokejové mistrovství světa 2024</h1>
      <div className="Filter">
        <input
          type="text"
          placeholder="Vyhledat zápas"
        />
      </div>
      <div className="MatchList">
        <h2>Zápasy</h2>
        <ul>
          <li>Česko vs. Slovensko</li>
          <li>USA vs. Kanada</li>
          <li>Rusko vs. Švédsko</li>
        </ul>
      </div>
    </div>
  );
}

export default App;
