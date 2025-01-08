console.clear();
import axios from 'axios';
import { useEffect, useState } from 'react';

const Card = (props) => {
  const { title, imageUrl, origin_price, price, onCardClick } = props;
  return (
    <div className="col my-2">
      <a
        href="#"
        className="card"
        data-bs-toggle="modal"
        data-bs-target="#ModalCoffee"
        onClick={onCardClick}
      >
        <img src={imageUrl} className="card-img-top object-fit" alt={title} />
        <div className="card-body">
          <p className="card-title">{title}</p>
          <p className="card-text float-end">
            <>
              <del className="text-danger">$ {origin_price}</del> / $ {price}
            </>
          </p>
        </div>
      </a>
    </div>
  );
};
const Content = (props) => {
  const { title, imageUrl, origin_price, price, content, description, unit, category, imagesUrl } = props;
  return (
    <div class="modal-body my-2">
      <img
        src={imageUrl}
        className="img-fluid rounded object-fit my-2"
        alt={title}
      />
      <h5 class="modal-title mb-2" id="exampleModalLabel">
        {title}
          <span className="badge text-bg-primary ms-1">
            {category}
          </span>
      </h5>
      <p>{description}</p>
      <p>{content}</p>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">
          原價：<del className="text-secondary">${origin_price}</del>
        </li>
        <li class="list-group-item">售價：${price}</li>
        <li class="list-group-item">單位：{unit}</li>
      </ul>
      <div className="row row-cols-3 gap-1">
      {imagesUrl?.map((item, index) => (
          <img key={index} src={item} className="img-fluid object-fit" />
      ))}
      </div>
    </div>
  );
};
const Main = () => {
  const [menus, setMenus] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const bannerImg =
    'https://media.istockphoto.com/id/1317886309/photo/traditional-japanese-sweets-sakura-mochi.jpg?s=612x612&w=0&k=20&c=nTww9qiNdeJJRopsdJgwZ7TiYVZClIUeu7FiPmwA7h8=';
  useEffect(() => {
    axios
    .get(
      `${import.meta.env.VITE_BASE_URL}/v2/api/${
        import.meta.env.VITE_API_PATH
      }/admin/products`
    )
    .then((res) => setMenus(res.data.products))
    .catch((err) => console.log(err));
  },[])
  const checkLogin = () => {
    axios.post(`${import.meta.env.VITE_BASE_URL}/v2/api/user/check`)
    .then(res => alert('確認已登入'))
    .catch(err => console.log(err));
  }
  return (
    <>
      <div className="container my-4">
        <div className="row mb-4">
          <h1 className="text-danger-emphasis">Happy Wagashi Menu</h1>
          <div className="my-2">
          <button type="button" className="btn btn-primary" onClick={checkLogin}>點此確認是否登入</button>
          </div>
          <img src={bannerImg} alt="" className="img-fluid" />
        </div>
        <div className="row row-cols-3">
          {menus.map((menu) => (
            <Card
              key={menu.id}
              {...menu}
              onCardClick={() => setSelectedMenu(menu)}
            />
          ))}
        </div>
      </div>
      <div
        class="modal fade"
        id="ModalCoffee"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-lg">
          <div class="modal-content">
            {selectedMenu && <Content {...selectedMenu} />}
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
