import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import { maxSum, Tree } from "./index.js";

class TreeNode implements Tree {
  public value: number;
  public left: Tree | null;
  public right: Tree | null;

  constructor(value: number, left: Tree | null = null, right: Tree | null = null) {
    this.value = value;
    this.left = left;
    this.right = right;
  }
}

describe("maxSum", () => {
  function doTest(result: number, tree: Tree | null) {
    const actual = maxSum(tree);
    assert.strictEqual(actual, result, `for tree:\n${String(tree)}\n`);
  }

  test('empty tree', function() {
    doTest(0, null);
  });

  test('root with 2 children', function() {
    doTest(4,
      new TreeNode(1, new TreeNode(2), new TreeNode(3))
    );
  });

  test('linear tree', function() {
    doTest(1 + 2 + 3 + 4,
      new TreeNode(1, new TreeNode(2, new TreeNode(3, new TreeNode(4))))
    );
  });

  test('1st example from description', function() {
    doTest(23,
      new TreeNode(17,
        new TreeNode(3,
          new TreeNode(2)
        ),
        new TreeNode(-10,
          new TreeNode(16),
          new TreeNode(1,
            new TreeNode(13)
          )
        )
      )
    );
  });

  test('should stop only at leaves - 2nd example from description', function() {
    doTest(-51,
      new TreeNode(5,
        new TreeNode(4,
          new TreeNode(-80),
          new TreeNode(-60)
        ),
        new TreeNode(10,
          new TreeNode(-90)
        )
      )
    );
  });
});

