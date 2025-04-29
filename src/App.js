import logo from './logo.svg';
import ChallengeOfTheDay from './components/ChallengeOfTheDay';
import AddChallenge from './components/AddChallenge';
import ChallengeHistory from './components/ChallengeHistory';
import './App.css';

function App() {
  return (
    <div className='App'>
      <h1>Daily Random Challenge</h1>
      <ChallengeOfTheDay/>
      <AddChallenge/>
      <ChallengeHistory/>
    </div>
  );
}

export default App;
