import React,{useEffect} from "react";
import Aos from "aos";

const Equipe = () => {

    useEffect(()=>{
        Aos.init({duration:2000,once:true})
    },[])

  return (
    <section  data-aos="fade-up"  className="equipe mb-4 mx-3 aos">
      <h2>Equipe</h2>
      <div
        className="row d-flex justify-content-center"
        style={{ width: "100%" }}
      >
        <div className="col-7 col-sm-4 col-lg-2 my-2 ">
          <div className="  equipeMember">
            <div className="img"></div>
            <div className="text-center py-2">
              <p
                className="fw-bold "
                style={{ fontSize: "14px", margin: "3px 0px" }}
              >
                Albert Einstein
              </p>
              <p
                className="fw-light"
                style={{ fontSize: "13px", margin: "2px 0px" }}
              >
                Physicien{" "}
              </p>
            </div>
          </div>
        </div>
        <div className="col-7 col-sm-4 col-md-4 col-lg-2 my-2 ">
          <div className="  equipeMember">
            <div className="img"></div>
            <div className="text-center py-2">
              <p
                className="fw-bold "
                style={{ fontSize: "14px", margin: "3px 0px" }}
              >
                Albert Einstein
              </p>
              <p
                className="fw-light"
                style={{ fontSize: "13px", margin: "2px 0px" }}
              >
                Physicien{" "}
              </p>
            </div>
          </div>
        </div>
        <div className="col-7  col-sm-4 col-lg-2 my-2 ">
          <div className="  equipeMember">
            <div className="img"></div>
            <div className="text-center py-2">
              <p
                className="fw-bold "
                style={{ fontSize: "14px", margin: "3px 0px" }}
              >
                Albert Einstein
              </p>
              <p
                className="fw-light"
                style={{ fontSize: "13px", margin: "2px 0px" }}
              >
                Physicien{" "}
              </p>
            </div>
          </div>
        </div>
        <div className="col-7 col-sm-4 col-lg-2 my-2 ">
          <div className="  equipeMember">
            <div className="img"></div>
            <div className="text-center py-2">
              <p
                className="fw-bold "
                style={{ fontSize: "14px", margin: "3px 0px" }}
              >
                Albert Einstein
              </p>
              <p
                className="fw-light"
                style={{ fontSize: "13px", margin: "2px 0px" }}
              >
                Physicien{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Equipe;
