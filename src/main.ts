import { TestManager } from "./testmgr";

const NUM_TRIALS: number = 100;
const NUM_SIM_RUNS: number = 500;

let mgr: TestManager = new TestManager(NUM_TRIALS, NUM_SIM_RUNS);
mgr.main();