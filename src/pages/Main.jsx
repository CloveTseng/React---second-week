console.clear();
import axios from 'axios';
import { useState } from 'react';

const Card = (props) => {
  const { title, image_url, origin_price, price, onCardClick } = props;
  return (
    <div className="col my-2">
      <a
        href="#"
        className="card"
        data-bs-toggle="modal"
        data-bs-target="#ModalCoffee"
        onClick={onCardClick}
      >
        <img src={image_url} className="card-img-top object-fit" alt={title} />
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
  const { title, image_url, origin_price, price, content, size, tags } = props;
  return (
    <div class="modal-body my-2">
      <img
        src={image_url}
        className="img-fluid rounded object-fit my-2"
        alt={title}
      />
      <h5 class="modal-title mb-2" id="exampleModalLabel">
        {title}
        {tags.map((tag, index) => (
          <span key={index} className="badge text-bg-primary ms-1">
            {tag}
          </span>
        ))}
      </h5>
      <p>{content}</p>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">尺寸：{size}</li>
        <li class="list-group-item">
          原價：<del className="text-secondary">${origin_price}</del>
        </li>
        <li class="list-group-item">售價：${price}</li>
      </ul>
    </div>
  );
};
const Main = () => {
  const [selectedMenu, setSelectedMenu] = useState(null);
  const bannerImg =
    'https://media.istockphoto.com/id/1317886309/photo/traditional-japanese-sweets-sakura-mochi.jpg?s=612x612&w=0&k=20&c=nTww9qiNdeJJRopsdJgwZ7TiYVZClIUeu7FiPmwA7h8=';
  const menus = [
    {
      id: 1,
      title: 'LATTE',
      tags: ['HOT', 'ICE'],
      image_url:
        'https://images.unsplash.com/photo-1495774856032-8b90bbb32b32?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      origin_price: 180,
      price: 120,
      size: '16oz',
      content:
        '淺培風味有熱帶水果、莓果豐富的水果香氣。尾韻飄上一股水果酒的微酸感受，清爽、微甜卻又帶有多層次的口感，豐富您的口感，帶給您熱情的感受。',
    },
    {
      id: 2,
      title: 'AMERICANO',
      tags: ['HOT', 'ICE'],
      image_url:
        'https://images.unsplash.com/photo-1711117205751-323ec1189b46?q=80&w=2786&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      origin_price: 150,
      price: 100,
      size: '16oz',
      content:
        '中焙風味，使用衣索比亞精品等級咖啡豆配製，風味帶有巧克力與焦糖香氣，尾韻微微帶回堅果氣味，帶給您溫暖幸福感受。',
    },
    {
      id: 3,
      title: 'MOCHA',
      tags: ['HOT', 'ICE'],
      image_url:
        'https://images.unsplash.com/photo-1530373239216-42518e6b4063?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      origin_price: 180,
      price: 140,
      size: '20oz',
      content:
        '嚴選阿拉比卡咖啡豆，享受綿密且細緻的奶泡覆蓋於牛奶與可可上，法國進口低脂鮮奶油上灑滿狗豬肉聯名可可粉末，清爽濃郁但不負擔的口感，給您極致奢華體驗。',
    },
  ];
  axios
    .get(
      `${import.meta.env.VITE_BASE_URL}/v2/api/${
        import.meta.env.VITE_API_PATH
      }/admin/products`
    )
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
  return (
    <>
      <div className="container my-4">
        <div className="row mb-4">
          <h1 className="text-danger-emphasis">Happy Wagashi Menu</h1>
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
        <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered">
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
