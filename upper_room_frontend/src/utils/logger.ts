class Logger {
  filePath: string;

  constructor(filePath: string) {
    this.filePath = filePath;
  }

  debug(...val: any) {
    return console.log("DEBUG:", this.filePath, ...val);
  }

  bigLog(...val: any) {
    return console.log(`
      **************************  
      **************************
      ${JSON.stringify(val)}
      **************************
      **************************
    `);
  }
}

export default Logger;
