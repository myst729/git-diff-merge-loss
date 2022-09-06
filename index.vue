<template>
  <div class="filter-content">
    <div class="filter-content__left">
      <el-form class="filter-form" ref="expFilterFormRef" :model="state.form" :label-width="state.labelWidth" inline>
        <div class="filter-form-basic">
          <el-form-item label="exp/desc:" prop="experimentContent">
            <el-input
              v-model="state.form.experimentContent"
              size="mini"
              class="item-width"
              maxlength="50"
              placeholder="keyword"
            ></el-input>
          </el-form-item>
          <el-form-item label="status:" prop="expStatusList">
            <el-select
              v-model="state.form.expStatusList"
              multiple
              collapse-tags
              clearable
              size="mini"
              placeholder="select"
              class="item-width"
              popper-class="exp-list-filter-select"
            >
              <el-option
                v-for="item in state.expStatusList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="node:" prop="orgIdList">
            <org-tree-cascader
              :onlyAuthorized="true"
              :defaultProp="{
                expandTrigger: ExpandTrigger.HOVER,
                multiple: true,
                value: 'id',
                label: 'name',
                emitPath: false,
                checkStrictly: true,
              }"
              class="item-width"
              placeholder="selectnode"
              @updateOrgListValue="(handleUpdateOrgIdList as any)"
              ref="orgTreeCascaderRef"
            ></org-tree-cascader>
            <!-- <el-select
              v-model="state.form.orgList"
              :loading="state.orgLoading"
              multiple
              collapse-tags
              clearable
              placeholder="selectnode"
              size="mini"
              class="item-width"
              popper-class="exp-list-filter-select"
            >
              <el-option
                v-for="item in state.orgList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select> -->
          </el-form-item>
        </div>
        <transition name="filter">
          <div v-show="state.isShowAll" class="filter-form-advanced">
            <el-form-item label="owner:" prop="admin">
              <el-select
                v-model="state.form.admin"
                clearable
                filterable
                remote
                placeholder="keyword"
                popper-class="exp-list-filter-select"
                :remote-method="adminRemoteMethod"
                :loading="state.adminLoading"
                size="mini"
                class="item-width"
              >
                <el-option
                  v-for="item in state.adminList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="world:" prop="worldList">
              <el-select
                size="mini"
                v-model="state.form.worldList"
                filterable
                remote
                multiple
                collapse-tags
                clearable
                reserve-keyword
                placeholder="keyword"
                class="item-width"
                popper-class="exp-list-filter-select"
                :remote-method="worldRemoteMethod"
                :loading="state.worldLoading"
              >
                <el-option
                  v-for="item in state.worldList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="related group:" prop="appGroupKeyList">
              <el-select
                v-model="state.form.appGroupKeyList"
                :loading="state.appGroupLoading"
                multiple
                collapse-tags
                clearable
                size="mini"
                placeholder="select"
                class="item-width"
                popper-class="exp-list-filter-select"
              >
                <el-option
                  v-for="item in state.appGroupList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <!-- <el-form-item label="conclusion:" prop="conclusionType">
            <el-select
              v-model="state.form.conclusionType"
              collapse-tags
              clearable
              size="mini"
              placeholder="select"
              class="item-width"
              popper-class="exp-list-filter-select"
            >
              <el-option
                v-for="item in state.conclusionTypeList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item> -->
            <el-form-item label="by time:" prop="time">
              <div class="connect-mixin">
                <el-select
                  v-model="state.form.time.timeType"
                  class="time-type-select"
                  size="mini"
                  @change="handleTimeTypeChange"
                >
                  <el-option
                    v-for="item in state.timeTypeList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
                <el-date-picker
                  class="date-picker-comp"
                  v-model="state.form.time.timeGroup"
                  type="datetimerange"
                  format="YYYY-MM-DD HH:mm:ss"
                  range-separator="to"
                  start-placeholder="start"
                  end-placeholder="end"
                  :disabledDate="disabledDate"
                  :default-time="[new Date(2000, 1, 1, 0, 0, 0), new Date(2000, 2, 1, 23, 59, 59)]"
                ></el-date-picker>
              </div>
            </el-form-item>
          </div>
        </transition>
      </el-form>
    </div>
    <div class="filter-content__right">
      <el-button type="primary" @click="searchExp" class="filter-btn">search</el-button>
      <el-button @click="resetForm" class="filter-btn">reset</el-button>
      <el-button type="text" @click="changeExpand" class="filter-btn-text">
        {{ state.isShowAll ? 'collapse' : 'expand' }}
        <ab-icon
          :class="['expand-icon', state.isShowAll ? 'open' : '']"
          :config="kdat_common_system_arrow_double_down"
          size="10px"
        ></ab-icon>
      </el-button>
    </div>
  </div>
</template>
