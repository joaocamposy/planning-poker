import { Model } from '../data/model';
import { ModelConfig } from '../data/model-config';
import { RoomParticipant } from './room-participant';

export class Room extends Model {
  readonly id?: string;
  readonly name?: string;
  readonly started?: boolean;
  readonly finished?: boolean;
  readonly voteOptions?: any[];
  readonly result?: {
    option?: any;
    votes?: number;
    percentage?: number;
  }[];
  readonly participants?: { [key: string]: RoomParticipant };

  config(): ModelConfig {
    return {
      attributes: [
        'name', 'result', 'started',
        'finished', 'voteOptions', 'participants'
      ],
      boot: () => {
        this.subscribe(values => {
          if (!values?.voteOptions) {
            this.update({ voteOptions: [1, 2, 3, 5, 8, 13, 21, 34, 55, 89] });
          }
        });
      },
    };
  }

  participate(sessionId: string, defaultValues: any): Promise<RoomParticipant> {
    return new Promise(resolve => {
      const sub = this.doc?.valueChanges().subscribe(values => {
        let participant = values?.participants?.[sessionId];

        if (!participant) {
          participant = defaultValues;
          const participants: any = {};
          participants[String(sessionId)] = participant;
          this.update({ participants });
        }

        sub?.unsubscribe();

        resolve(participant);
      });
    });
  }

  vote(sessionId: string, vote?: any): void {
    const v: any = {};
    v[sessionId] = { vote };
    this.update({ participants: v });
  }

  start(): void {
    const participants: any = {};

    Object.keys(this.participants || []).forEach(key => participants[key] = { vote: null });

    this.update({ started: true, finished: false, participants });
  }

  finish(): void {
    const groupBy = (items: any, key: any) => items.reduce(
      (result: any, item: any) => ({
        ...result,
        [item[key]]: [
          ...(result[item[key]] || []),
          item,
        ],
      }),
      {},
    );

    const votes = Object.values(this.participants || {})
      .map(item => {
        return { vote: item.vote };
      })
      .filter(item => item.vote !== null && item.vote !== undefined);

    let result: any = [];
    const resultGroupedByVote = groupBy(votes, 'vote');

    (this.voteOptions || []).forEach(key => {
      result.push({
        option: key,
        votes: resultGroupedByVote[key]?.length || 0,
        percentage: (resultGroupedByVote[key]?.length || 0) * 100 / votes.length,
      })
    });

    this.update({ started: false, finished: true, result });
  }
}
