import { Link } from 'react-router'

const Landing = () => {
    return (
      <main className="landingPage">
        <h1>Welcome to Recipe share!</h1>
        <h2 className="tagLine">Discover, Create, and Share Your Favorite Recipes</h2>
        <div className="landingButtons">
          <Link to="/sign-up" className="landingButton">Get Started</Link>
          <Link to="/sign-in" className="landingButtonTwo">Sign In</Link>
        </div>
      </main>
    );
  };
  
  export default Landing;