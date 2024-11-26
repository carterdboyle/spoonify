import View from './View.js';
import icons from 'url:../../img/icons.svg'; //Parcel 2

class SortView extends View {
  _parentElement = document.querySelector('.sort-results');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', e => {
      const btn = e.target.closest('.btn--inline');

      if (!btn) return;

      console.log(this._data);

      handler(!this._data.sort);
    });
  }

  _generateMarkup() {
    return `
        <button class="btn--inline sort-results__btn"> 
            SORT &downarrow;
        </button>
    `;
  }
}

export default new SortView();
