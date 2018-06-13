import { TestManager } from "./testmgr";

const NUM_TRIALS: number = 10;
const NUM_SIM_RUNS: number = 100;

let mgr: TestManager = new TestManager(NUM_TRIALS, NUM_SIM_RUNS);
mgr.main();