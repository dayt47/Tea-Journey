import '../../Styles/Information.css';
import Up from '../../Assets/up.png';
import { counter } from '../../apiService';
import { useAuth } from '../../Utils/auth';

const Information = ({ className, text, arrows }) => {
  const { userInfo, setUserInfo } = useAuth();
  async function counterUp() {
    counter('up')
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      teas_drunken: prevUserInfo.teas_drunken + 1,
    }));
  }
  
  async function counterDown() {
    counter('down')
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      teas_drunken: prevUserInfo.teas_drunken - 1,
    }));
  }

  return (
    <div className={className} id='Information'>
      {arrows ? (
        <>
          <img src={Up} alt="Up" onClick={counterDown} />
          <h4 id='Counter'>{userInfo.teas_drunken}</h4>
          <img src={Up} alt="Down" onClick={counterUp} />
        </>
      ) : (
        <h4>{text}</h4>
      )}
    </div>
  );
}

export default Information;
