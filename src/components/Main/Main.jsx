import { useContext } from "react";
import { assets } from "../../assets/assets";
import "./Main.css";
import { Context } from "../../context/Context";

const Main = () => {
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input,

  } = useContext(Context);

  return (
    <div className="main">
      <div className="nav">
        <p>JUSTICE-4-ALL</p>
        <img src="./assets/logo_icon" alt="" />
      </div>
      <div className="main-container">
        {!showResult ? (
          <>
            <div className="greet">
              <p>
                <span>Hello Moses,</span>
              </p>
              <p>How can I help You Today?</p>
              {/* <img src={assets} className="center" alt=""/> */}
            </div>
            <div className="cards">
              <div className="card">
                <p>How talk with a police officer</p>

                
              </div>
              <div className="card">
                <p>
                  What to do if I am pull over by the police and I was speeding?
                </p>
              </div>
              <div className="card">
                <p>Suggest a beautiful place to </p>
              </div>
            </div>
          </>
        ) : (
          <div className="result">
            <div className="recent-title">
              <div >User</div>
              {/* <img src={assets.user_icon} alt=""  /> */}
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <div > J4A</div>
              {/* <img src={assets.gemini_icon} /> */}
              {loading ? (
                <div className="loader">
                    {/* <hr />
                    <hr />
                    <hr /> */}
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
              )}
            </div>
          </div>
        )}
        <div className="main-bottom">
          <div className="search-box">
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              className="text"
              placeholder="Chat with Justice-4-All..."
            />
            <div>
              { input ? <img onClick={() => onSent()} src={assets.send_icon} alt="" /> : null}
            </div>
          </div>
          <p className="bottom-info">
            {" "}
            Justice-4-All is currently on testing and it will be release soon.
          </p>
        </div>
      </div>
    </div>
  );
};
export default Main;
