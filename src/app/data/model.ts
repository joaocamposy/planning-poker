import { AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { BehaviorSubject } from 'rxjs';
import { ModelConfig } from './model-config';

export abstract class Model extends BehaviorSubject<any> {
  protected attributes: string[] = [];
  protected _config?: ModelConfig;

  constructor(
    readonly data = {},
    readonly doc?: AngularFirestoreDocument,
  ) {
    super(data);

    this._config = this.config();
    this._config.attributes.push('id');

    this._config.attributes.forEach(key => {
      Object.defineProperty(this, key, {
        get: () => {
          return key === 'id' && this.doc ?
            this?.doc.ref.id :
            (this.value || {} as any)[key];
        },
        set: () => {
          throw new TypeError(`Property ${key} is readonly. Use update instead.`);
        },
      });
    });

    if (doc) {
      doc.valueChanges().subscribe(values => this.next(values));
    }

    if (this._config.boot) {
      this._config.boot(this);
    }
  }

  config(): ModelConfig {
    return {
      attributes: [],
      boot: () => undefined
    };
  }

  update(values: any, merge = true): Promise<void> {
    if (this.doc) {
      if (merge) {
        return this.doc.set(values, { merge: true });
      } else {
        return this.doc.update(values);
      }
    }

    if (merge) {
      this.next(this.merge(this.value, values));
    } else {
      this.next(values);
    }

    return Promise.resolve(values);
  }

  private merge(target: any, source: any): void {
    // Iterate through `source` properties and if an `Object` set
    // property to merge of `target` and `source` properties.
    for (const key of Object.keys(source)) {
      if (source[key] instanceof Object) {
        Object.assign(source[key], this.merge(target[key], source[key]));
      }
    }

    // Join `target` and modified `source`.
    Object.assign(target || {}, source);
  }
}
