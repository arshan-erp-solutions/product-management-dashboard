# Testing Checklist

Use this checklist to verify all features work correctly before your internship review.

## ✅ Setup & Installation

- [ ] Project runs with `npm run dev`
- [ ] No console errors on startup
- [ ] All dependencies installed correctly
- [ ] Tailwind CSS working properly

## ✅ Dashboard Page (/)

- [ ] Total Products count is correct
- [ ] Active Products count is correct
- [ ] Low Stock count is correct (stock ≤ 5)
- [ ] Out of Stock count is correct
- [ ] Recent Products table shows 5 most recent
- [ ] All statistics update when products change
- [ ] "View all" link navigates to Products page

## ✅ Products Page (/products)

### Search
- [ ] Search by product name works
- [ ] Search by category works
- [ ] Search by description works
- [ ] Search is case-insensitive
- [ ] Search results update in real-time
- [ ] Search works with other filters

### Filters
- [ ] Category filter shows correct options
- [ ] Category filter works correctly
- [ ] Status filter works correctly
- [ ] Price min filter works
- [ ] Price max filter works
- [ ] Price range filter works together
- [ ] All filters work simultaneously

### Sorting
- [ ] Default sort maintains order
- [ ] Name A-Z sorts correctly
- [ ] Name Z-A sorts correctly
- [ ] Price Low to High sorts correctly
- [ ] Price High to Low sorts correctly
- [ ] Stock Low to High sorts correctly
- [ ] Stock High to Low sorts correctly
- [ ] Newest first sorts correctly
- [ ] Oldest first sorts correctly

### Pagination
- [ ] Shows correct number of pages
- [ ] 10 products per page
- [ ] Previous button disabled on page 1
- [ ] Next button disabled on last page
- [ ] Page numbers work correctly
- [ ] Pagination resets when filters change
- [ ] Shows correct "Showing X of Y products"

### Table View (Desktop)
- [ ] All columns display correctly
- [ ] Product images load properly
- [ ] Fallback image shows on broken images
- [ ] Status badges show correct colors
- [ ] Stock quantities display correctly
- [ ] Prices formatted as $XX.XX
- [ ] Dates formatted as "Mon DD, YYYY"
- [ ] Action buttons work (View, Edit, Delete)

### Card View (Mobile)
- [ ] Cards display on mobile screens
- [ ] All product info visible
- [ ] Actions accessible on cards
- [ ] No horizontal overflow
- [ ] Touch targets are large enough

### Selection
- [ ] Individual checkboxes work
- [ ] Select All checkbox works
- [ ] Selected count badge appears
- [ ] Delete Selected button appears
- [ ] Bulk delete confirmation works
- [ ] Bulk delete removes correct products

### Export
- [ ] Export CSV button works
- [ ] CSV file downloads
- [ ] CSV contains all filtered products
- [ ] CSV format is correct

## ✅ Add Product Page (/products/add)

### Form Fields
- [ ] Product Name field works
- [ ] Image URL field works
- [ ] Category dropdown works
- [ ] Price field works
- [ ] Stock field works
- [ ] Description field works
- [ ] Status dropdown works

### Validation
- [ ] Name required validation works
- [ ] Name min 2 chars validation works
- [ ] Name max 100 chars validation works
- [ ] Category required validation works
- [ ] Price required validation works
- [ ] Price must be number validation works
- [ ] Price ≥ 0 validation works
- [ ] Stock required validation works
- [ ] Stock must be integer validation works
- [ ] Stock ≥ 0 validation works
- [ ] Description required validation works
- [ ] Description min 10 chars validation works
- [ ] Status required validation works
- [ ] Error messages display correctly
- [ ] Form keeps values on validation error

### Submission
- [ ] Valid product saves successfully
- [ ] Product appears in products list
- [ ] Success toast appears
- [ ] Redirects to Products page
- [ ] LocalStorage updated
- [ ] Refresh keeps new product

## ✅ Edit Product Page (/products/:id/edit)

- [ ] Form pre-populates with product data
- [ ] All fields editable
- [ ] Validation works same as Add
- [ ] Update saves correctly
- [ ] Success toast appears
- [ ] Redirects to Products page
- [ ] LocalStorage updated
- [ ] Product not found shows error state
- [ ] "Back to Products" button works

## ✅ Product Details Page (/products/:id)

- [ ] Large product image displays
- [ ] All product info visible
- [ ] Name displays correctly
- [ ] Category displays correctly
- [ ] Price formatted correctly
- [ ] Stock displays correctly
- [ ] Status badge displays correctly
- [ ] Description displays correctly
- [ ] Product ID displays
- [ ] Created date formatted correctly
- [ ] Edit Product button works
- [ ] Delete button works
- [ ] Delete confirmation modal works
- [ ] Back to Products button works
- [ ] Product not found handled

## ✅ Delete Functionality

- [ ] Delete button opens confirmation modal
- [ ] Modal shows product name
- [ ] Cancel button closes modal
- [ ] Delete button removes product
- [ ] Success toast appears
- [ ] Product removed from list
- [ ] LocalStorage updated
## ✅ Delete Functionality

- [ ] Delete button opens confirmation modal
- [ ] Modal shows product name
- [ ] Cancel button closes modal
- [ ] Delete button removes product
- [ ] Success toast appears
- [ ] Product removed from list
- [ ] LocalStorage updated
- [ ] Pagination adjusts if needed

## ✅ Drag & Drop

- [ ] Drag handle visible on rows
- [ ] Can drag products up and down
- [ ] Visual feedback during drag
- [ ] Products reorder on drop
- [ ] New order persists after refresh
- [ ] Works with filtered products
- [ ] Doesn't break other functionality

## ✅ Dark/Light Mode

- [ ] Toggle button in header
- [ ] Switches between themes
- [ ] All components styled in both modes
- [ ] No unreadable text in either mode
- [ ] Theme persists after refresh
- [ ] Sidebar styled correctly
- [ ] Tables styled correctly
- [ ] Forms styled correctly
- [ ] Modals styled correctly
- [ ] Cards styled correctly

## ✅ Responsive Design

### Mobile (320px-639px)
- [ ] No horizontal scroll
- [ ] Sidebar drawer works
- [ ] Menu button visible
- [ ] Product cards display
- [ ] Filters stack vertically
- [ ] Forms single column
- [ ] Buttons accessible
- [ ] Modals fit screen
- [ ] Images scale properly
- [ ] Pagination usable

### Tablet (640px-1023px)
- [ ] Layout adapts properly
- [ ] Sidebar drawer works
- [ ] Table or cards display well
- [ ] Filters wrap appropriately
- [ ] Forms 2 columns

### Desktop (1024px+)
- [ ] Sidebar always visible
- [ ] Full table displays
- [ ] All filters in one row
- [ ] Forms multi-column
- [ ] Optimal spacing

## ✅ Navigation

- [ ] Dashboard link works
- [ ] Products link works
- [ ] Add Product link works
- [ ] Active route highlighted
- [ ] Breadcrumb/page title updates
- [ ] 404 page works for invalid routes
- [ ] Back buttons work

## ✅ UI Components

### Buttons
- [ ] Primary variant styled
- [ ] Secondary variant styled
- [ ] Danger variant styled
- [ ] Ghost variant styled
- [ ] Outline variant styled
- [ ] Different sizes work
- [ ] Disabled state works
- [ ] Loading state works

### Inputs
- [ ] Text input works
- [ ] Number input works
- [ ] Labels display
- [ ] Error messages display
- [ ] Focus states work
- [ ] Dark mode styled

### Select
- [ ] Dropdown works
- [ ] Options display
- [ ] Selection works
- [ ] Labels display
- [ ] Error messages display

### Modal
- [ ] Opens correctly
- [ ] Closes on X button
- [ ] Closes on Cancel
- [ ] Closes on Escape key
- [ ] Backdrop click closes
- [ ] Different sizes work
- [ ] Dark mode styled

### Toast
- [ ] Success toast shows
- [ ] Error toast shows
- [ ] Warning toast shows
- [ ] Info toast shows
- [ ] Auto-dismisses
- [ ] Manual close works
- [ ] Positioned correctly

### Pagination
- [ ] Page numbers display
- [ ] Previous/Next work
- [ ] Disabled states correct
- [ ] Ellipsis shows for many pages
- [ ] Current page highlighted

### Badges
- [ ] Success variant styled
- [ ] Warning variant styled
- [ ] Danger variant styled
- [ ] Info variant styled
- [ ] Default variant styled

## ✅ Data Persistence

- [ ] Products load from localStorage
- [ ] Mock data loads on first visit
- [ ] Add persists after refresh
- [ ] Edit persists after refresh
- [ ] Delete persists after refresh
- [ ] Reorder persists after refresh
- [ ] Theme persists after refresh

## ✅ Performance

- [ ] No unnecessary re-renders
- [ ] Search debounced properly
- [ ] Filtering is fast
- [ ] No console warnings
- [ ] Images load efficiently
- [ ] No memory leaks

## ✅ Accessibility

- [ ] Semantic HTML used
- [ ] Labels on all inputs
- [ ] ARIA labels on icon buttons
- [ ] Keyboard navigation works
- [ ] Focus indicators visible
- [ ] Color contrast sufficient
- [ ] Screen reader friendly

## ✅ Error Handling

- [ ] Invalid product ID handled
- [ ] Empty product list handled
- [ ] Broken images show fallback
- [ ] Form validation errors clear
- [ ] No app crashes on bad input

## ✅ Code Quality

- [ ] No TODO comments
- [ ] No console.log statements
- [ ] Consistent formatting
- [ ] Meaningful variable names
- [ ] Components are focused
- [ ] No duplicate code
- [ ] All imports correct

## ✅ Browser Compatibility

Test in:
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge

## ✅ Final Checks

- [ ] README.md complete
- [ ] PROJECT_EXPLANATION.md complete
- [ ] .gitignore present
- [ ] package.json correct
- [ ] All files committed
- [ ] No sensitive data in code
- [ ] App builds without errors
- [ ] Production build works

---

## Screen Recording Flow

Record your screen demonstrating these steps in order:

1. **Open Dashboard** (5 sec)
   - Show statistics cards
   - Point out recent products table

2. **Navigate to Products** (3 sec)
   - Click Products in sidebar

3. **Search Product** (5 sec)
   - Type "phone" in search
   - Show filtered results

4. **Apply Category Filter** (5 sec)
   - Select "Electronics"
   - Show combined filter results

5. **Apply Status Filter** (5 sec)
   - Select "Active"
   - Show further filtered results

6. **Apply Price Filter** (5 sec)
   - Enter Min: 20, Max: 100
   - Show price-filtered results

7. **Sort Products** (5 sec)
   - Select "Price High to Low"
   - Show sorted results

8. **Navigate Pagination** (5 sec)
   - Click page 2, then page 3
   - Show different products

9. **Add Product** (15 sec)
   - Click Add Product
   - Fill form with invalid data first
   - Show validation errors
   - Fill with valid data
   - Submit successfully
   - Show success toast

10. **Show New Product** (5 sec)
    - Navigate to Products
    - Find new product in list

11. **Open Product Details** (5 sec)
    - Click View/Eye icon
    - Show complete details page

12. **Edit Product** (10 sec)
    - Click Edit Product
    - Change price
    - Save
    - Show update success

13. **Delete Product** (10 sec)
    - Click Delete
    - Show confirmation modal
    - Click Cancel (show it cancels)
    - Click Delete again
    - Confirm deletion
    - Show product removed

14. **Bulk Delete** (10 sec)
    - Select 3 products with checkboxes
    - Show "3 selected" badge
    - Click Delete Selected
    - Confirm in modal
    - Show all removed

15. **Drag & Drop** (10 sec)
    - Drag a product up
    - Drag another down
    - Refresh browser
    - Show order persisted

16. **Export CSV** (5 sec)
    - Click Export CSV
    - Show downloaded file
    - Open to show content

17. **Toggle Dark Mode** (5 sec)
    - Click theme toggle
    - Show dark theme
    - Click again
    - Show light theme
    - Refresh to show persistence

18. **Mobile Responsive** (15 sec)
    - Resize browser to mobile width
    - Show sidebar drawer
    - Show product cards
    - Show filters stacked
    - Show form single column
    - Resize back to desktop

**Total Recording Time: ~2-3 minutes**

---

## Tips for Recording

1. **Use screen recording software** like OBS, Loom, or QuickTime
2. **Speak clearly** explaining what you're doing
3. **Move slowly** so reviewer can follow
4. **Highlight key features** as you demonstrate
5. **Show both success and error states**
6. **Mention technical decisions** briefly
7. **Keep it under 3 minutes**
8. **Test your recording** before final take