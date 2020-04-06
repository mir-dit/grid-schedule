import {users, ISpecialist} from '../../../mocks/user';
import {records, IRecord} from '../../../mocks/record';

export interface IScheduleService {
    getSpecialists(date: Date): ISpecialist[];
    getUserRecordsIncludesDate(user: ISpecialist, date: Date): IRecord[];
    getUserRecordsBetweenDates(user: ISpecialist, date: Date, nextDate: Date): IRecord[];
}

export class ScheduleService implements IScheduleService {

    private specialists: ISpecialist[];

    constructor() {
        this.specialists = users.filter((user: ISpecialist) => user.schedule) as ISpecialist[];
    }

    getSpecialists(date: Date): ISpecialist[] {
        return this.specialists.filter(user => user.schedule.days.includes(date.getDay()));
    }

    getUserRecordsIncludesDate(user: ISpecialist, date: Date): IRecord[] {
        return records.filter(({userId, start, end}: IRecord) => userId === user.id && start <= date && date <= end);
    }

    getUserRecordsBetweenDates(user: ISpecialist, date: Date, nextDate: Date): IRecord[] {
        return records.filter(({userId, start, end}: IRecord) => userId === user.id && date < start && end < nextDate);
    }

}