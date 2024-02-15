import MovieCarousel from '../../Components/MovieCarousel';
import SeriesCarousel from '../../Components/SeriesCarousel';
import '../Home/style.css';


function Home() {
    return (
      <div className="home_screen">
          <h1>O que deseja assistir?</h1>
          <MovieCarousel />
          <SeriesCarousel />

        </div>
    );
  }
  
  export default Home;