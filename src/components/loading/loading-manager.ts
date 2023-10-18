class LoadingManager {
  _defaultLoading: any = null;

  register(_ref: any): void {
    if (!this._defaultLoading) {
      this._defaultLoading = _ref;
    }
  }

  unregister(_ref: any) {
    if (!!this._defaultLoading && this._defaultLoading._id === _ref._id) {
      this._defaultLoading = null;
    }
  }

  getDefault() {
    return this._defaultLoading;
  }
}

export default new LoadingManager();
