import { Model } from '../data/model';
import { ModelConfig } from '../data/model-config';

export class User extends Model {
  id?: string;
  name?: string;
  isAdmin?: boolean;
  preferences?: {
    theme?: {
      color?: string;
      accentColor?: string;
    }
  }

  config(): ModelConfig {
    return {
      attributes: [
        'name', 'isAdmin', 'preferences',
      ],
      boot: () => {},
    };
  }
}
