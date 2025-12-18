# Tabs Component: Performance Optimization Strategies

## Problem Statement

When using the Tabs component with load-heavy content (e.g., large code blocks, images, complex components), the tab switching animation can stagger or appear janky. This occurs because:

1. Content is rendered/mounted only when the tab becomes active
2. Heavy content causes layout shifts and paint operations during the animation
3. The browser must perform expensive operations (parsing, layout, paint) while animating

## Current Implementation

The current tabs implementation (`@/registry/delta-ui/delta/tabs.tsx`) uses conditional rendering by default:

- **Default behavior**: Content unmounts when tab is inactive (memory efficient)
- **`forceMount` prop**: Keeps content mounted but hidden (better performance, higher memory)
- **Animation system**: CSS transitions on opacity and transform

## Proposed Solutions

### Solution 1: Pre-render with Hidden Content (Recommended for SEO/LLM)

**Implementation Approach:**
- Use `forceMount={true}` on all TabsContent components
- Content loads on initial page load
- All tabs are present in DOM but hidden via CSS
- No mounting/unmounting on tab switches

**Pros:**
- ✅ LLM/crawler-friendly - all content visible in DOM/HTML
- ✅ Instant tab switching - no layout shifts
- ✅ No animation stagger
- ✅ Better for SEO - search engines can index all content
- ✅ Content pre-cached for subsequent views

**Cons:**
- ❌ Higher initial memory usage
- ❌ Slower initial page load (all content parsed upfront)
- ❌ Not suitable for very large numbers of tabs (>10)
- ❌ Wasted resources if users don't visit all tabs

**Best For:**
- Documentation sites with 3-5 tabs
- Code examples and tutorials
- Content that should be indexed
- Relatively lightweight tab content

**Usage Example:**
```tsx
<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
  </TabsList>

  <TabsContent value="tab1" forceMount={true}>
    {/* Heavy content - loaded on mount */}
  </TabsContent>

  <TabsContent value="tab2" forceMount={true}>
    {/* Heavy content - loaded on mount */}
  </TabsContent>
</Tabs>
```

---

### Solution 2: Lazy Loading with Preload on Hover

**Implementation Approach:**
- Content loads on demand (default behavior)
- Preload next tab content on hover/focus of tab trigger
- Use React.lazy() with Suspense for code splitting
- Prefetch data on hover with a small delay (150-200ms)

**Pros:**
- ✅ Best balance of performance and UX
- ✅ Lower initial memory footprint
- ✅ Smooth switching for anticipated tabs
- ✅ Progressive enhancement approach

**Cons:**
- ❌ Not crawler-friendly - hidden content not in DOM
- ❌ Requires custom implementation
- ❌ More complex state management
- ❌ May still have slight delay on unexpected switches

**Best For:**
- Applications with many tabs (5+)
- Heavy interactive components
- Data-driven content
- User-facing applications (not documentation)

**Implementation Pattern:**
```tsx
function TabsWithPreload() {
  const [preloadedTabs, setPreloadedTabs] = useState<Set<string>>(new Set())

  const handleTabHover = (tabId: string) => {
    if (!preloadedTabs.has(tabId)) {
      // Trigger preload after delay
      setTimeout(() => {
        setPreloadedTabs(prev => new Set(prev).add(tabId))
      }, 150)
    }
  }

  return (
    <Tabs>
      <TabsList>
        <TabsTrigger
          value="tab1"
          onMouseEnter={() => handleTabHover("tab2")}
        />
        <TabsTrigger
          value="tab2"
          onMouseEnter={() => handleTabHover("tab3")}
        />
      </TabsList>

      <TabsContent value="tab1">Content 1</TabsContent>
      <TabsContent
        value="tab2"
        forceMount={preloadedTabs.has("tab2")}
      >
        Content 2
      </TabsContent>
    </Tabs>
  )
}
```

---

### Solution 3: Skeleton Loading with Deferred Rendering

**Implementation Approach:**
- Show skeleton/placeholder on tab switch
- Defer heavy content rendering by 1 frame
- Let animation complete before expensive paint
- Use `requestAnimationFrame` to schedule content render

**Pros:**
- ✅ Smooth animations always
- ✅ Visual feedback during loading
- ✅ Works with any content weight
- ✅ Maintains good perceived performance

**Cons:**
- ❌ Requires skeleton UI design
- ❌ Content not immediately visible
- ❌ Not crawler-friendly
- ❌ More component complexity

**Best For:**
- Apps with very heavy tab content
- Dynamic/async content
- Loading external resources
- Professional dashboards

**Implementation Pattern:**
```tsx
function TabsWithDeferred() {
  const [renderContent, setRenderContent] = useState(false)

  useEffect(() => {
    setRenderContent(false)
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setRenderContent(true)
      })
    })
  }, [activeTab])

  return (
    <TabsContent>
      {renderContent ? (
        <HeavyContent />
      ) : (
        <SkeletonLoader />
      )}
    </TabsContent>
  )
}
```

---

### Solution 4: Content Virtualization

**Implementation Approach:**
- Keep content mounted but virtualize heavy parts
- Only render visible portions of lists/grids
- Use libraries like `react-window` or `react-virtual`
- Maintain scroll position between tab switches

**Pros:**
- ✅ Handles extremely large datasets
- ✅ Consistent memory usage
- ✅ Fast tab switching
- ✅ Scalable solution

**Cons:**
- ❌ Only works for list/grid content
- ❌ Additional dependency
- ❌ More complex implementation
- ❌ Not suitable for all content types

**Best For:**
- Large tables or lists in tabs
- Data-heavy applications
- Infinite scroll scenarios
- Grid-based layouts

---

### Solution 5: CSS `content-visibility` Property

**Implementation Approach:**
- Use modern CSS `content-visibility: auto`
- Browser defers rendering off-screen content
- Maintains content in DOM for crawlers
- Automatic performance optimization

**Pros:**
- ✅ No JavaScript required
- ✅ Crawler-friendly
- ✅ Browser handles optimization
- ✅ Simple implementation

**Cons:**
- ❌ Browser support not universal (90%+ modern browsers)
- ❌ Less control over behavior
- ❌ May cause layout shift issues
- ❌ Requires careful CSS containment setup

**Best For:**
- Modern browser targets only
- Simple implementation preference
- Content-heavy documentation
- Progressive enhancement

**Usage Example:**
```tsx
<TabsContent
  value="tab1"
  forceMount={true}
  className="[content-visibility:auto] [contain-intrinsic-size:auto_500px]"
>
  {/* Heavy content */}
</TabsContent>
```

---

## Recommendation Matrix

| Use Case | Solution | Why |
|----------|----------|-----|
| Documentation (2-5 tabs) | Solution 1 (Pre-render) | SEO + no stagger + simple |
| Heavy code examples | Solution 1 + Solution 5 | Crawler access + CSS optimization |
| Application (5+ tabs) | Solution 2 (Lazy + Preload) | Balance of UX + performance |
| Very heavy content | Solution 3 (Skeleton) | Guaranteed smooth animation |
| Data tables/lists | Solution 4 (Virtualization) | Handles unlimited data |
| Modern apps only | Solution 5 (CSS) | Simple + automatic |

## Implementation Priority

For the Delta Components documentation site:

1. **Immediate**: Use `forceMount={true}` on code example tabs (Solution 1)
   - Ensures LLM scraping works
   - Eliminates animation stagger
   - Acceptable memory trade-off for docs

2. **Short-term**: Add `content-visibility` CSS classes (Solution 5)
   - Progressive enhancement
   - No code changes required
   - Works alongside forceMount

3. **Long-term**: Consider hover preload (Solution 2) for component examples
   - Better for many examples
   - Improves first load performance

## Testing Recommendations

When implementing solutions, test:

1. **Animation smoothness**: DevTools FPS counter should stay >50fps
2. **Memory usage**: Check DevTools memory profiler
3. **Initial load time**: Lighthouse performance score
4. **Mobile performance**: Test on mid-range devices
5. **Crawler visibility**: View source HTML, check robots can see content
6. **LLM scraping**: Use Claude/GPT web browsing to verify content access

## Browser DevTools Debug Commands

```js
// Check if content is in DOM
document.querySelectorAll('[role="tabpanel"]').length

// Measure layout shifts
new PerformanceObserver((list) => {
  list.getEntries().forEach(entry => {
    console.log('Layout shift:', entry.value)
  })
}).observe({entryTypes: ['layout-shift']})

// Force tab switch and measure
performance.mark('tab-switch-start')
// ... switch tab ...
performance.mark('tab-switch-end')
performance.measure('tab-switch', 'tab-switch-start', 'tab-switch-end')
```

## Additional Resources

- [MDN: content-visibility](https://developer.mozilla.org/en-US/docs/Web/CSS/content-visibility)
- [web.dev: content-visibility guide](https://web.dev/content-visibility/)
- [React docs: Lazy loading](https://react.dev/reference/react/lazy)
- [CSS Containment](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Containment)
