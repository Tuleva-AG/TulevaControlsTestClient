export default class Utils {
  public static sortItems(
    items: any[],
    sortBy: string,
    descending: boolean = false,
    sortByMember?: string,
    secondSortBy?: string,
    secondDescending?: boolean
  ): any[] {
    if (descending) {
      return items.sort((a: any, b: any) => {
        if (sortByMember !== undefined) {
          if (a[sortBy][sortByMember] < b[sortBy][sortByMember]) {
            return 1;
          }

          if (a[sortBy][sortByMember] > b[sortBy][sortByMember]) {
            return -1;
          }
        } else {
          if (a[sortBy] < b[sortBy]) {
            return 1;
          }

          if (a[sortBy] > b[sortBy]) {
            return -1;
          }
        }
        // second sort
        if (secondSortBy !== undefined) {
          if (secondDescending) {
            if (a[secondSortBy] < b[secondSortBy]) {
              return 1;
            }

            if (a[secondSortBy] > b[secondSortBy]) {
              return -1;
            }
          } else {
            if (a[secondSortBy] < b[secondSortBy]) {
              return -1;
            }

            if (a[secondSortBy] > b[secondSortBy]) {
              return 1;
            }
          }
        }

        return 0;
      });
    } else {
      return items.sort((a: any, b: any) => {
        if (sortByMember !== undefined) {
          if (a[sortBy][sortByMember] < b[sortBy][sortByMember]) {
            return -1;
          }

          if (a[sortBy][sortByMember] > b[sortBy][sortByMember]) {
            return 1;
          }
        } else {
          if (a[sortBy] < b[sortBy]) {
            return -1;
          }

          if (a[sortBy] > b[sortBy]) {
            return 1;
          }
        }

        // second sort
        if (secondSortBy !== undefined) {
          if (secondDescending) {
            if (a[secondSortBy] < b[secondSortBy]) {
              return 1;
            }

            if (a[secondSortBy] > b[secondSortBy]) {
              return -1;
            }
          } else {
            if (a[secondSortBy] < b[secondSortBy]) {
              return -1;
            }

            if (a[secondSortBy] > b[secondSortBy]) {
              return 1;
            }
          }
        }

        return 0;
      });
    }
  }
}
