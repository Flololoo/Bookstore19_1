import {State} from "./state";

export class StateFactory {

    static empty(): State {
        return new State(null, '', 0);
    }

    static fromObject(rawState: any): State {
        return new State(
            rawState.id,
            rawState.comment,
            rawState.string,
        );
    }

}