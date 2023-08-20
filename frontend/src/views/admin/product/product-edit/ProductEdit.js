import {useParams} from 'react-router-dom';
import {Product} from '../../../../models/product.model';
import { useTranslation } from 'react-i18next';

export function ProductEdit() {
  const {id} = useParams();
  const { t } = useTranslation();

  const onSubmit = value => {
    const product = new Product({
      name: value.name,
      description: value.description,
      price: value.price,
    });
    console.log(product);
    if (id) {
      // update
    } else {
      // create
    }
  };
  return (
    <div>
      {t('welcome')} <span className=" text-red-400 text-lg">{id || 'NEW'}</span>
      <button
        onClick={onSubmit}
        type="button"
        className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
      >
        Test On submit
      </button>
    </div>
  );
}
