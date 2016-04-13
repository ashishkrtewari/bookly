angular.module('Bookly',[

])
.controller('MainCtrl',function($scope){
  $scope.categories = [
      {"id": 0, "name": "Development"},
      {"id": 1, "name": "Design"},
      {"id": 2, "name": "Exercise"},
      {"id": 3, "name": "Humor"}
  ];

  $scope.bookmarks = [
      {"id": 0, "title": "AngularJS", "url": "http://angularjs.org", "category": "Development" },
      {"id": 1, "title": "Egghead.io", "url": "http://angularjs.org", "category": "Development" },
      {"id": 2, "title": "A List Apart", "url": "http://alistapart.com/", "category": "Design" },
      {"id": 3, "title": "One Page Love", "url": "http://onepagelove.com/", "category": "Design" },
      {"id": 4, "title": "MobilityWOD", "url": "http://www.mobilitywod.com/", "category": "Exercise" },
      {"id": 5, "title": "Robb Wolf", "url": "http://robbwolf.com/", "category": "Exercise" },
      {"id": 6, "title": "Senor Gif", "url": "http://memebase.cheezburger.com/senorgif", "category": "Humor" },
      {"id": 7, "title": "Wimp", "url": "http://wimp.com", "category": "Humor" },
      {"id": 8, "title": "Dump", "url": "http://dump.com", "category": "Humor" }
  ];

  $scope.currentCategory = null;
  function setCurrentCategory(category){
    $scope.currentCategory = category;
    cancelCreating();
    cancelEditing();
  }
  function isCurrentCategory(category) {
    return $scope.currentCategory != null && category.name === $scope.currentCategory.name;
  }
  $scope.setCurrentCategory = setCurrentCategory;
  $scope.isCurrentCategory = isCurrentCategory;

  $scope.isCreating = false;
  $scope.isEditing = false;

  function resetCreateForm() {
      $scope.newBookmark = {
          title: '',
          url: '',
          category: $scope.currentCategory.name
      };
  }
  $scope.editedBookmark = null;

  function setEditedBookmark(bookmark) {
      $scope.editedBookmark = angular.copy(bookmark);
  }
  $scope.setEditedBookmark = setEditedBookmark;
  function resetEditForm() {
      $scope.editedBookmark = {
          title: 'editedBookmark.title',
          url: 'editedBookmark.url',
          category: editedBookmark.category
      };
  }
  function isSelectedBookmark(bookmarkId) {
    return $scope.editedBookmark != null && $scope.editedBookmark.id === bookmarkId;
  }
  $scope.isSelectedBookmark = isSelectedBookmark;
  function shouldShowCreating() {
      return $scope.currentCategory && !$scope.isEditing;
  }
  function startCreating() {
      $scope.isCreating = true;
      $scope.isEditing = false;
      resetCreateForm();
  }

  function cancelCreating() {
      $scope.isCreating = false;
  }

  function startEditing() {
      $scope.isCreating = false;
      $scope.isEditing = true;
      resetEditForm();
  }

  function cancelEditing() {
      $scope.isEditing = false;
      $scope.editedBookmark = null;
  }
  function shouldShowEditing() {
      return $scope.isEditing && !$scope.isCreating;
  }

  $scope.startCreating = startCreating;
  $scope.cancelCreating = cancelCreating;
  $scope.startEditing = startEditing;
  $scope.cancelEditing = cancelEditing;
  $scope.shouldShowEditing = shouldShowEditing;
  $scope.shouldShowCreating = shouldShowCreating;



  //-------------------------------------------------------------------------------------------------
  // CRUD
  //-------------------------------------------------------------------------------------------------

  function createBookmark(bookmark) {
      bookmark.id = $scope.bookmarks.length;
      $scope.bookmarks.push(bookmark);

      resetCreateForm();
  }

  function updateBookmark(bookmark) {
      var index = _.findIndex($scope.bookmarks, function (b) {
          return b.id == bookmark.id
      });
      $scope.bookmarks[index] = bookmark;

      $scope.editedBookmark = null;
      $scope.isEditing = false;
  }

  $scope.deletedBookmark = null;

  function deleteBookmark(bookmark) {
    $scope.deletedBookmark = bookmark;
    _.remove($scope.bookmarks, function(b){
      return b.id == bookmark.id;
    });
  }
  function resetDeletedBookmark(){
    $scope.deletedBookmark = null;
  }
  function undoDeleteBookmark(deletedBookmark) {
    $scope.bookmarks.push(deletedBookmark);
    resetDeletedBookmark();
  }

  $scope.createBookmark = createBookmark;
  $scope.updateBookmark = updateBookmark;
  $scope.deleteBookmark = deleteBookmark;
  $scope.undoDeleteBookmark = undoDeleteBookmark;
  $scope.resetDeletedBookmark = resetDeletedBookmark;
});
