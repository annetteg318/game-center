import { LightningElement, wire} from 'lwc';
import getTopGamers from '@salesforce/apex/TopGamersController.getTopGamers';

export default class scoreBoard extends LightningElement {
        gamers;
        error;

        @wire(getTopGamers)
        wiredTopGamers({ error, data }) {
            if (data) {
                this.gamers = data.map((gamer, index) => {
                    let rankIcon = '';
                    if (index === 0) rankIcon = '🥇';
                    else if (index === 1) rankIcon = '🥈';
                    else if (index === 2) rankIcon = '🥉';
                    else rankIcon = `#${index + 1}`;

                    return {
                        ...gamer,
                        rankIcon
                    };
                });
                this.error = undefined;
            } else if (error) {
                this.error = error;
                this.gamers = undefined;
            }
        }
    }