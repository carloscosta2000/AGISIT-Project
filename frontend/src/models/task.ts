export interface Task {
    _id: string;
    taskName: string;
    priority: string;
    progressPerc: number;
    user: string[];
    project: String;
    startDate: Date;
    endDate: Date;
}