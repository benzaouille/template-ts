export class TimeService {
    // Adjusts the provided date to the specified GMT time zone
    public adjustDateToGMT(currentTime: number, timeZoneOffset: number, gmtOffset: number): Date {
        const utc = currentTime + (timeZoneOffset * 60000);
        return new Date(utc + (gmtOffset * 3600000));
    }

    // Converts PM time to AM and vice versa based on 12-hour format
    public pm2am(hours: number): number {
        if (hours === 0) {
            return 12;  // Midnight as 12 AM
        } else if (hours === 12) {
            return 12;  // Noon as 12 PM
        } else if (hours > 12) {
            return hours - 12;  // PM time
        } else {
            return hours;  // AM time
        }
    }
}
