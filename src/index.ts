interface errorInfo {
  line: number
  column: number
  filename: string
};

interface ErrorMessage {
  message: string
  stack: Array<errorInfo>
};

const analyzeStackInfo: (errString: string) => errorInfo = function (errString: string): errorInfo {
  const reg: RegExp = /(http.+):(\d+):(\d+)/ig;
  const results: string[] = reg.exec(errString);
  if (!results) return null;
  const [, filename, line, column] = results;
  return {
    line: +line,
    column: +column,
    filename
  };
};

export const getErrorMessage: (fixtureStack?: string) => ErrorMessage = function (fixtureStack?: string): ErrorMessage {
  if (!fixtureStack) {
    return {
      message: '',
      stack: []
    };
  }
  const strs: string[] = fixtureStack.split('\n');
  const message: string = strs.shift();
  const stack: Array<errorInfo | null> = strs.map(errStr => analyzeStackInfo(errStr));
  return {
    message,
    stack: stack.filter(errorInfo => errorInfo)
  };
};
