interface Swap {
  from: string;
  to: string;
}

export class Redirect {
  // todo
  readonly replace: Swap[] = [{
    from: 'http://localhost:4000/events', 
    to: 'https://about.toughlovearena.com/events',
  }, {
    from: 'http://localhost:4000/log?v=', 
    to: 'https://about.toughlovearena.com/log#',
  }];

  for(url: string): string | undefined {
    console.log(`redirecting: ${url}`);
    for (const swap of this.replace) {
      if (url.includes(swap.from)) {
        return url.replace(swap.from, swap.to);
      }
    }
  }
}