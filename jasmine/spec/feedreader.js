/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */


/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('has URL', function() {
            for(feed of allFeeds) {
                expect(feed.url).toBeDefined();
                expect(feed.url).not.toBe(null);
            }
        });

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('has name', function() {
            for(feed of allFeeds) {
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBe(null);
            }
        });
    });


    /* TODO: Write a new test suite named "The menu" */
    describe('The Menu', function() {
        let body;
        let icon; 

        beforeEach(function() {
            body = document.getElementsByTagName('body')[0];
            icon = document.querySelector('.menu-icon-link');

        });

        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */

        it('is hidden', function() {
            // should include menu-hidden on load (default)
            expect(body.classList.contains('menu-hidden')).toBe(true);
            
        });

         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
         
         it('slides out', function() {
            // simulate click first time (open)
            icon.click();
            expect(body.classList.contains('menu-hidden')).toBe(false);

            // simulate click second time (close)
            icon.click();
            expect(body.classList.contains('menu-hidden')).toBe(true);
        });

    });

    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {
 
        beforeEach(function(done) {
            loadFeed(0, function(){
                done();
            });

        });

        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        it('entries are loaded', function(done) {

            let feed = document.querySelector('.feed');
            let entries = feed.children;

            expect(entries.length).toBeGreaterThan(0);

            for(entry of entries) {
                expect(entry.firstElementChild.classList.contains('entry')).toBe(true);
            };
            done();

        });
    });

    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
        let initialEntries;
        let afterEntries;
        let beforeArr = [];
        let afterArr = [];
        let feed = document.querySelector('.feed');

        // asynch run loadFeed using done
        beforeEach(function(done) {
            loadFeed(0, function(){
                done();
            });

        });
        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */

        // run test once asynch call is finished
        it('changes content', function(done) {

            // caputure initial entires and store in an array
            initialEntries = feed.children;
            for(entry of initialEntries) {
                beforeArr.push(entry);
            };
  
            // load a new feed and call our call back once finished
            loadFeed(1, cb);

            function cb() {

                // capture new feed and store in an array
                afterEntries = feed.children;
                for(entry of afterEntries) {
                    afterArr.push(entry);
                };

                // compare all array elements between the two
                for(value of beforeArr) {

                    // in case before array is longer than after array, dont test past last value
                    if(beforeArr.indexOf(value) < afterArr.length) {
                        expect(value.innerHTML).not.toEqual(afterArr[beforeArr.indexOf(value)].innerHTML);
                    }
                    
                }
                done();

            };

        });
    });
    
}());
