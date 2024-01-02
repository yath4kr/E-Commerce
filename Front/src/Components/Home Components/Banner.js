function Banner() {
  let a = [
    {
      img: `./assets/images/banner_img.png`,
      tilte: `<span className="blu">Welcome <br /></span>To Our Sunglasses`,
    },
    {
      img: `./assets/images/banner_img.png`,
      tilte: `<span className="blu">Welcome <br /></span>To Our Sunglasses`,
    },
  ];
  return (
    <>
      <section className="banner_main">
        <div id="banner1" className="carousel slide" data-ride="carousel">
          <ol className="carousel-indicators">
            <li
              data-target="#banner1"
              data-slide-to="0"
              className="active"
            ></li>
            <li data-target="#banner1" data-slide-to="1"></li>
            <li data-target="#banner1" data-slide-to="2"></li>
          </ol>
          {a.map((v, i) => {
            return (
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <div className="container">
                    <div className="carousel-caption">
                      <div className="text-bg">
                        <h1>
                          {" "}
                          <span className="blu">
                            Welcome <br />
                          </span>
                          To Our Sunglasses
                        </h1>
                        <figure>
                          <img src="./assets/images/banner_img.png" alt="#" />
                        </figure>
                        <a className="read_more" href="#">
                          Shop Now
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          <a
            className="carousel-control-prev"
            href="#banner1"
            role="button"
            data-slide="prev"
          >
            <i className="fa fa-arrow-left" aria-hidden="true"></i>
          </a>
          <a
            className="carousel-control-next"
            href="#banner1"
            role="button"
            data-slide="next"
          >
            <i className="fa fa-arrow-right" aria-hidden="true"></i>
          </a>
        </div>
      </section>
    </>
  );
}
export default Banner;
