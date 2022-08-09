import { computed, makeObservable, observable, runInAction } from 'mobx';

class UserStore {
  public user?: { id: string };

  public token: string = '';

  public get isLoggedIn() {
    return (
      typeof this.token !== 'undefined' || typeof this.user !== 'undefined'
    );
  }

  public set setToken(token: string) {
    runInAction(() => {
      console.log('set undfined', token);
      this.token = token;
    });
  }

  constructor() {
    makeObservable(this, {
      user: observable.ref,
      token: observable,
      isLoggedIn: computed
    });
  }
}

export default new UserStore();
