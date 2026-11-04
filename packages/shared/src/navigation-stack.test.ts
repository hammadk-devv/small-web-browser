// packages/shared/src/navigation-stack.test.ts
import { describe, it, expect, beforeEach } from 'vitest';
import { NavigationStack } from './navigation-stack';
import { HistoryEntry } from './types';

const entry = (address: string): HistoryEntry => ({
    address,
    title: `Title: ${address}`,
    visitedAt: new Date().toISOString(),
});

describe('NavigationStack', () => {
    let stack: NavigationStack;

    beforeEach(() => {
        stack = new NavigationStack();
    });

    it('starts empty with no current entry', () => {
        expect(stack.current).toBeNull();
        expect(stack.canGoBack).toBe(false);
        expect(stack.canGoForward).toBe(false);
        expect(stack.toArray()).toEqual([]);
    });

    it('push adds entry and moves cursor forward', () => {
        stack.push(entry('a.zz'));
        expect(stack.current?.address).toBe('a.zz');
        expect(stack.canGoBack).toBe(false);
        expect(stack.canGoForward).toBe(false);
    });

    it('back and forward navigate through entries', () => {
        stack.push(entry('a.zz'));
        stack.push(entry('b.zz'));
        stack.push(entry('c.zz'));

        expect(stack.back()?.address).toBe('b.zz');
        expect(stack.back()?.address).toBe('a.zz');
        expect(stack.canGoBack).toBe(false);

        expect(stack.forward()?.address).toBe('b.zz');
        expect(stack.forward()?.address).toBe('c.zz');
        expect(stack.canGoForward).toBe(false);
    });

    it('CRITICAL: push after back destroys forward history', () => {
        stack.push(entry('a.zz'));
        stack.push(entry('b.zz'));
        stack.push(entry('c.zz'));

        stack.back(); // at b.zz
        stack.back(); // at a.zz

        stack.push(entry('d.zz')); // New navigation destroys forward

        expect(stack.toArray().map(e => e.address)).toEqual(['a.zz', 'd.zz']);
        expect(stack.current?.address).toBe('d.zz');
        expect(stack.canGoForward).toBe(false);
    });

    it('back at start is a no-op', () => {
        stack.push(entry('a.zz'));
        expect(stack.back()).toBeNull();
        expect(stack.current?.address).toBe('a.zz');
    });

    it('forward at end is a no-op', () => {
        stack.push(entry('a.zz'));
        expect(stack.forward()).toBeNull();
    });

    it('jumpTo navigates to arbitrary index', () => {
        stack.push(entry('a.zz'));
        stack.push(entry('b.zz'));
        stack.push(entry('c.zz'));

        expect(stack.jumpTo(0)?.address).toBe('a.zz');
        expect(stack.jumpTo(2)?.address).toBe('c.zz');
        expect(stack.jumpTo(-1)).toBeNull();
        expect(stack.jumpTo(99)).toBeNull();
    });

    it('toArray returns an immutable copy', () => {
        stack.push(entry('a.zz'));
        const arr = stack.toArray();
        expect(arr).toHaveLength(1);
        // Mutation should not affect internal state
        (arr as HistoryEntry[]).push(entry('b.zz'));
        expect(stack.toArray()).toHaveLength(1);
    });
});